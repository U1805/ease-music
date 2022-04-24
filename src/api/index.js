import requests from './request.js'

export const getList = (id)=>{
    return requests({url:`https://netease-cloud-music-api-khaki-chi.vercel.app/playlist/detail?id=${ id }`,method:'get'})
}