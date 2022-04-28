import requests from "./request.js";

export const getList = (id) => {
  return requests({ url: `/playlist/track/all?id=${id}&limit=1000`, method: "get", withCredentials: true });
};

export const getUserList = (uid) => {
  return requests({ url: `/user/playlist?uid=${uid}`, method: "get", withCredentials: true });
};

export const getDetail = async (id) => {
  return requests({ url: `/song/detail?ids=${id}`, method: "get", withCredentials: true });
};

export const getAudio = (id) => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
};

export const search = (key, num = 30) => {
  var pattern = /^[0-9]*$/;
  num = pattern.test(num) ? num : 30;
  return requests({ url: `/search?keywords=${key}&limit=${num}`, method: "get", withCredentials: true });
};

//登录函数
export const checkStatus = async function (key) {
  const res = await requests({
    url: `https://netease-cloud-music-api-khaki-chi.vercel.app/login/qr/check?key=${key}&timerstamp=${Date.now()}`,
    withCredentials: true, //关键
  });
  return res;
};
export const getLoginStatus = async function () {
  const res = await requests({
    url: `https://netease-cloud-music-api-khaki-chi.vercel.app/login/status?timerstamp=${Date.now()}`,
    withCredentials: true, //关键
  });
  localStorage.setItem("uid", res.data.account.id);
};
