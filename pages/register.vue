<template>
    <div class="page-register">
        <article class="header">
            <header>
                <a href="/" class="site-logo"/>
                <span class="login">
                    <em class="bold">已有美团账号？</em>
                    <a href="/login">
                         <el-button type="primary" size="small">
                            登录
                        </el-button>
                    </a>
                </span>
            </header>
        </article>
        <section>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="昵称" prop="name">
                    <el-input v-model="ruleForm.name"/>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="ruleForm.email"/>
                    <el-button size="mini" round @click="sendMsg">发送验证码</el-button>
                    <span class="status">{{statusMsg}}</span>
                </el-form-item>
                <el-form-item label="验证码" prop="code">
                    <el-input v-model="ruleForm.code" maxlength="4"/>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input v-model="ruleForm.pwd" type="password"/>
                </el-form-item>
                <el-form-item label="确认密码" prop="cpwd">
                    <el-input v-model="ruleForm.cpwd" type="password"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="register">同意以下协议并注册</el-button>
                    <div class="error">{{error}}</div>
                </el-form-item>
                <el-form-item>
                    <a href="http://www.meituan.com/about/terms" class="f1" target="_blank">《美团网用户协议》</a>
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>
<script>
import CryptoJS from 'crypto-js'
export default {
    layout:'blank',
    data(){
        return{
            // 验证码提示信息
            statusMsg:'',
            // 错误提示信息
            error:'',
            // 表单相关信息
            ruleForm:{
                // 名字
                name:'',
                // 验证码
                code:'',
                // 密码
                pwd:'',
                // 确认密码
                cpwd:'',
                // 邮箱
                email:'',
            },
            // 校验规则
            rules:{
                // name的校验规则
                name:[{
                    // name是不是必选项，
                    required:true,
                    // name是什么类型
                    type:'string',
                    // 不填的时候我们提示什么信息，或者错的时候
                    message:'请输入昵称',
                    // 什么时候触发校验规则，这里我们选择的是失去焦点的时候
                    trigger:'blur'
                     
                }],
                email:[{
                    required:true,
                    // 不能写string，要写email，这样它会帮你验证邮箱名是不是合法
                    type:'email',
                    message:'请输入邮箱',
                    trigger:'blur',
                }],
                pwd:[{
                    required:true,message:'创建密码',trigger:'blur'
                }],
                cpwd:[
                    { required:true,messsge:'确认密码',trigger:'blur' },
                    {
                        // 二次验证，对比两次密码的内容，需要内置一个函数，支持验证函数的自定义
                        // validator是一个函数，函数的第一个是rule规则，第二个是value值，第三个是回调
                        validator:(rule, value, callback) => {
                            if(value === ''){
                                callback(new Error('请再次输入密码'))
                            }else if(value != this.ruleForm.pwd){
                                callback(new Error('两次输入密码不一致'))
                            }else{
                                callback()
                            }
                    },
                    trigger:'blur'
                }]     
            }
        }
    },
    methods:{
        sendMsg: function(){
            const self = this;
            let namePass;
            let emailPass;
            if(self.timerid){
                return false
            }
            // 验证用户名有没有通过规则校验，有值表示错误，没有表示正确,valid是从表单得到的用户的输入值
            this.$refs['ruleForm'].validateField('name', (valid) =>{  
                namePass = valid
            })
            self.statusMsg = '';
            // 如果没有通过，那就不再往下检查
            if(namePass){   //有值表示错误
                return false
            }
            // 如果通过了，再检查邮箱是否符合规则
            // 这个方法是element-ui提供的方法
            this.$refs['ruleForm'].validateField('email', (valid) =>{
                emailPass = valid;
            })
            // 这两个值都通过的情况下
            if(!namePass && !emailPass){
                self.$axios.post('/users/verify', {
                    // 拿到用户输入的值
                    username: encodeURIComponent(self.ruleForm.name),
                    email: self.ruleForm.email
                }).then(({
                    // 解构赋值
                    status, 
                    data
                }) =>{
                    // console.log(status, data, data.code);
                    // 连接成功，验证码发送成功
                    if(status === 200 && data && data.code === 0){
                        let count = 60;
                        self.statusMsg = `验证码已发送，剩余${count--}秒`
                        // 定时器,倒计时60s
                        self.timerid = setInterval(function(){
                            self.statusMsg = `验证码已发送，剩余${count--}秒`
                            if(count === 0){
                                clearInterval(self.timerid)
                            }
                        },1000)
                    // 如果没成功
                    }else{
                        self.statusMsg = data.msg
                    }
                })
            }
        },
        register: function(){
            let self = this;
            //  验证所有校验逻辑是否通过，如果valid是true的话，那么校验规则都有效
            this.$refs['ruleForm'].validate((valid)=>{
                if(valid){
                    // 发起注册接口动作
                    self.$axios.post('/users/signup', {
                        // 将username进行编码，因为username有可能是中文名称
                        username: window.encodeURIComponent(self.ruleForm.name),
                        // 将密码进行加密，利用crypto-js,这个库是非常常见的与加密有关的库,先下载(npm i crypto-js)再引进(import CryptoJS from 'crypto-js')
                        // 利用MD5将密码进行加密，加密后返回来的是数组，所以一定要用toString方法
                        password: CryptoJS.MD5(self.ruleForm.pwd).toString(),
                        email: self.ruleForm.email,
                        code: self.ruleForm.code
                    }).then(({status, data}) =>{
                        if(status === 200){
                            if(data && data.code === 0){
                                // 注册完了，强制跳转到登录页面
                                location.href = '/login'
                            }else{
                                self.error = data.msg
                            }
                        }else{
                            self.error = `服务器出错，错误码${status}`
                        }
                        // 如果不清除，再显示会造成误导，所以定时清空error
                        setTimeout(function(){
                            self.error = '';
                        }, 1500)
                    })
                }
            })
        }
    }
}
</script>
<style lang="scss">
    @import "@/assets/css/register/index.scss";
    // 836126515@qq.com
</style>
