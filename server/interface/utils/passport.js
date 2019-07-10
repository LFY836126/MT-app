// passport是所有的node程序都可以应用的，koa-passport是对它进行了一个封装，适配koa的
import passport from 'koa-passport'
// passport-local是passport本地的一个策略
import LocalStrategy from 'passport-local'
import UserModel from '../../dbs/models/users'

// 第一个参数是一个函数，函数又有三个参数username, password，和回调函数done
passport.use(new LocalStrategy(async function(username, password, done){
    // console.log(username, password);// 这个username和password就是注册后进行登录操作，传给signin的参数，也就是我刚刚注册的帐户名和密码
    // 设置查询条件
    let where = {
        username,
    };
    // 利用模型
    let result = await UserModel.findOne(where)
    if(result != null){
        // 根据用户名查出来库里存储的该用户对应的密码，判断是否和当前用户输入的密码一样
        if(result.password === password){
            return done(null, result)
        }else{
            return done(null, false, '密码错误')
        }
    }else{
        return done(null, false, '用户不存在')
    }
}))

// 每次用户进来的时候，都自动通过session去验证
// passport提供的这两个api是固定用法，是库里封装好的api

// 序列化:序列化指的是把用户对象存到session里
passport.serializeUser(function(user, done){
    // 我查到用户登录验证成功之后，会把用户的数据存储到session中
    done(null, user);
})
// 反序列化:从session里取用户数据成对象，session 可能是存数据库的或者写文件里的
passport.deserializeUser(function(user, done){
    // 在每次请求的时候，会从session中读取用户对象
    return done(null, user);
})
// 登录验证成功了，我把数据打到cookies中，因为http通信是没有状态的，session是存储在cookies中，存在浏览器端，下次再进来的时候，我会从cookies中把你的session的信息提出来，和服务端的session做验证对比，如果能找到的话，就说明这个人是登录状态，从而达到一个无状态到有状态的转变

export default passport