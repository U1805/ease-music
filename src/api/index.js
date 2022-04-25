import requests from './request.js'

export const getList = (id)=>{
    return requests({url:`/playlist/detail?id=${ id }`,method:'get'})
}

export const  getDetail = async (id)=>{
    return requests({url:`/song/detail?ids=${ id }`,method:'get'})
}

export const getAudio = (id)=>{
    return `https://music.163.com/song/media/outer/url?id=${ id }.mp3`
}

// //登录函数
// async function checkStatus(key) {
//     const res = await requests({
//     url: `https://netease-cloud-music-api-khaki-chi.vercel.app/login/qr/check?key=${key}&timerstamp=${Date.now()}`,
//     withCredentials: true, //关键
//     })
//     return res
// }
// async function getLoginStatus() {
//     const res = await requests({
//     url: `https://netease-cloud-music-api-khaki-chi.vercel.app/login/status?timerstamp=${Date.now()}`,
//     withCredentials: true, //关键
//     })
//     localStorage.setItem('uid',res.data.account.id)
// }
// async function login() {
//     let timer
//     getLoginStatus()
//     const res = await requests({
//     url: `https://netease-cloud-music-api-khaki-chi.vercel.app/login/qr/key?timerstamp=${Date.now()}`,
//     withCredentials: true, //关键
//     })
//     const key = res.data.unikey
//     // const res2 = await requests({
//     // url: `https://netease-cloud-music-api-khaki-chi.vercel.app/login/qr/create?key=${key}&qrimg=true&timerstamp=${Date.now()}`,
//     // withCredentials: true, //关键
//     // })
//     // that.qr = res2.data.qrimg

//     timer = setInterval(async () => {
//         const statusRes = await checkStatus(key)
//         if (statusRes.code === 800) {
//             alert('二维码已过期,请重新获取')
//             clearInterval(timer)
//         }
//         if (statusRes.code === 803) {
//             // 这一步会返回cookie
//         //   console.log(JSON.stringify(statusRes, null, 2))
//             clearInterval(timer)
//             alert('授权登录成功')
//             await getLoginStatus()
//             window.location.reload();
//         }
//     }, 3000)
// }
// export default login()