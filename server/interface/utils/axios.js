import axios from 'axios'
const instance = axios.create({
    //{process.penv.HOST||'localhost'}：判断当前环境变量的主机，如果host没有设置的话，默认取本机
    //{process.env.POST||3000}：判断端口，如果没有的话，设置为3000
    baseURL: `http://${process.env.HOST||'localhost'}:${process.env.PORT||3000}`,
    // 设置超时
    timeout:2000,
    headers:{

    }
})
export default instance