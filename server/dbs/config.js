export default{
    // mongodb连接方式
    dbs:'mongodb://127.0.0.1:27017/student',
    // redis连接方式
    redis:{
        get host(){
            return '127.0.0.1'
        },
        get port(){
            return 6379
        }
    },
    // smtp服务
    smtp:{
        get host(){
            // 这里是固定的,因为smtp服务不是自己提供的，是使用腾讯的qq邮箱
            return 'smtp.qq.com'
        },
        get user(){
            // qq邮箱
            return '836126515@qq.com'
        },
        get pass(){
            // 配置授权码,每个人都不一样
            return 'kwurxozuremibgaf'
        },
        // 配置验证码，每次验证码都是随机地四位数
        get code(){
            return ()=>{
                return Math.random().toString(16).slice(2,6).toUpperCase()
            }
        },
        // 配置验证码过期时间，这里设置1分钟
        get expire(){
            return ()=>{
                return new Date().getTime() + 60*1000
            }
        }
    },  
}