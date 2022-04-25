import axios from "axios";
import nprogress from "nprogress";
import 'nprogress/nprogress.css'

const requests = axios.create({
    baseURL:'https://netease-cloud-music-api-khaki-chi.vercel.app/',
    // timeout: 5000
})


//请求拦截器
requests.interceptors.request.use((config)=>{
    nprogress.start()
    return config
})

//响应拦截器
requests.interceptors.response.use((res)=>{
    nprogress.done()
    // console.log(res.data)
    return res.data
},(error)=>{
    // console.log(error)
})

export default requests