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
export default {
    layout:'blank',
    data(){
        return{
            statusMsg:'',
            ruleForm:{
                name:'',
                code:'',
                pwd:'',
                cpwd:'',
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
                cpwd:[{
                    required:true,messsge:'确认密码',trigger:'blur'
                },{
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
                    }
                }]     
            }
        }
    },
    methods:{
        sendMsg: function(){},
        register: function(){}
    }
}
</script>
<style lang="scss">
    @import "@/assets/css/register/index.scss";
</style>