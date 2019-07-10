 import Router from 'koa-router'
//  借助redis，实现当a和b同时发验证码的是时候，能够将用户和验证码对应上
 import Redis from 'koa-redis'
//  Redis作用:它有个一工具，就是我在node中用刚才注册的SMTP服务，如何给对方的填的一个邮箱发邮件，就是在node上，怎么用自己的邮箱给他的邮箱发程序
// 就是在邮箱验证的时候，我们除了在邮箱部分开启smtp(注册的smtp服务),还要在node上安装一个对应的应用程序nodemailer
import nodeMailer from 'nodemailer'
import User from '../dbs/models/users.js'
import Email from '../dbs/config'
import axios from './utils/axios'
import Passport from './utils/passport'

let router = new Router({
    // 定义一个前缀
    prefix:'/users'
})
// 声明变量获取redis客户端
let Store = new Redis().client
// 定义注册接口，要用post方式，更安全
router.post('/signup', async(ctx) =>{
    // 获取用户在这个接口上传的几个数据
    const{
        username,
        password,
        email,
        code,
    } = ctx.request.body;
    // 注意: post方式如何去获取post方式上传的数据，是要用ctx.request.body这个方法 

    // 拿到数据验证
    // 在nodemnail发验证码的时候会在redis上去存了一下，然后在这里要把存的东西拿出来，做对比
    if(code){
        const saveCode = await Store.hget(`nodemail:${username}`, 'code')
        // 过期时间，不能让验证码无限有效
        const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
        if(code === saveCode){
            // 验证过期时间
            // console.log(new Date().getTime(),saveExpire);
            if(new Date().getTime() - saveExpire > 0){
                ctx.body={
                    code:-1,
                    msg:'验证码已过期，请重新尝试',
                }
                return false
            }
        }else{
            ctx.body={
                code:-1,
                msg:'请填写正确的验证码'
            }
        }
    }else{
        ctx.body={
            code:-1,
            msg:'请填写验证码'
        }
    }
    let user = await User.find({
        username,
    })
    // 因为这个是注册接口，如果已经被注册了就返回-1
    if(user.length){
        ctx.body = {
            code: -1,
            msg: '已被注册'
        }
        return 
    }
    // 将用户名和密码进行写库操作
    // nuser -> new user
    let nuser = await User.create({
        username,
        password,
        email,
    })
    // console.log('success')
    // 判断是否成功写库
    if(nuser){
    // 如果写库成功，进行自动登录动作
        let res = await axios.post('/users/signin',{
            username,
            password
        })
        // 如果成功
        // console.log(res.data);
        if(res.data&&res.data.code === 0){
            ctx.body = {
                code:0,
                msg:'注册成功',
                user: res.data.user
            }
        }
        // 如果没有成功
        else{
            ctx.body = {
                code: -1,
                msg:'error'
            }
        }
    // 如果写库失败
    }else{
        ctx.body = {
            code:-1,
            msg:'注册失败'
        }
    }

}) 
// 定义登陆接口
router.post('/signin', async(ctx, next) => {
    // 写passport时候用的是local策略，这里调用local策略，这个策略会给你返回一个信息
    return Passport.authenticate('local', function(err, user, info, status){
        // 如果出错了，也就是err存在
        if(err){
            ctx.body = {
                code : -1,
                msg : err,
            }
        }else{
            if(user){
                ctx.body = {
                    code: 0,
                    msg: '登录成功',
                    user
                }
                // 做登录动作
                return ctx.login(user)
            }else{
                ctx.body = {
                    code: 1,
                    // 如果发现异常，把具体信息返回去
                    msg: info,
                }
            }
        }
    })(ctx, next)// 把当前的上下文对象传进这个api进去，这是固定用法
})
// 验证码验证
router.post('/verify', async(ctx, next) => {
    // 获取用户和验证码过期时间
    let username = ctx.request.body.username;
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
    // 拦截，避免频繁的刷那个接口
    if(saveExpire && new Date().getTime() - saveExpire < 0){
        ctx.body = {
            code: -1,
            msg: '请求过于频繁'
        }
        return false
    }
    // 开启一个 SMTP 连接池
    let transporter = nodeMailer.createTransport({
        host : Email.smtp.host,
        port: 587,
        // secure:true   --> for port 465
        // secure:false  --> for port 587
        secure: false,
        // 创建smtp服务
        // 在dbs中config.js文件中配置的参数
        auth:{
            user: Email.smtp.user,
            pass: Email.smtp.pass
        }
    })
    // 对外发送哪些信息，以及接收方式是什么
    let ko = {
        // 设置验证码是什么
        code: Email.smtp.code(),
        // 每发送一次验证码都设置一个过期时间
        expire : Email.smtp.expire(),
        // 我要给谁发邮件
        email: ctx.request.body.email,
        // 我用哪个用户名发验证码
        user: ctx.request.body.username
    }
    // 邮件中显示哪些内容
    let mailOptions = {
        // 发送方
        from : `"认证邮件" <${Email.smtp.user}>`,
        // 接收方
        to : ko.email,
        // 主题
        subject: `注册码`,
        html: `您的验证码是${ko.code}`,
    }
    await transporter.sendMail(mailOptions, (err, info) =>{
        if(err){
            return console.log('error');
        }else{
            Store.hmset(`nodemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)
        }
    })
    ctx.body = {
        code: 0,
        msg:'验证码已发送',
    }
})
// 退出
router.get('/exit', async(ctx, next) => {
    await ctx.logout()
    // 二次验证，检查现在是不是注销了状态
    if(!ctx.isAuthenticated()){
        ctx.body = {
            code: 0,
        }
    }else{
        ctx.body = {
            code: -1,
        }
    }
})
// 获取用户名
router.get('/getUser', async(ctx) =>{
    //isAuthenticated()， 是passport内部固定的的api，
    // 判断用户是否登录
    if(ctx.isAuthenticated()){
        // 我们的passport会把我们的用户信息的session放到session对象里面去，ctx这个上下文对象中session就有passport相关信息，所以我们的passport是存储在这个session中的
        // 如果它是登录状态的话，session中一定有passport，passport中一定有user
         const {username, email} = ctx.session.passport.user
         ctx.body = {
             user: username,
             email,
         }
    }else{
        // 如果用户没有登录
        ctx.body = {
            user: '',
            email: '',
        }
    }
})
export default router