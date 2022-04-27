本项目是个人初见 Vue 的小练习（只会前端三件套的弱狗第一次学这种东西）

![](./asset/v2-ae41.jpg)

PC 端为主，没有适配移动端；也没有考虑浏览器兼容

> api：[网易云音乐 NodeJS 版 API (binaryify.github.io)](https://binaryify.github.io/NeteaseCloudMusicApi/#/)
>
> Bootstrap
>
> Vue.js
>
> Axios
>
> vue3-draggable-resizable
>
> nprogress
>
> vuex

[演示地址](https://ease-music.vercel.app/)

## 界面：

主要是想做简洁一些，所以只放了自己最常用的功能（以最新版为准）

![主界面](./asset/main.jpg)

![播放设置](./asset/setting.jpg)

## 功能

🌕 播放器基本功能：

上一曲、下一曲、播放、暂停、单曲循环、列表循环、随机循环、进度条、音量控制、搜索

🌕 歌单相关功能：

导入歌单、网易云登录、导入个人歌单列表、歌单点播、播放收藏歌曲

🌕 没有实际作用的功能：

背景更换（链接/本地上传）、界面可拖拽

## 反思

做这个练习时深深感受到基础不够，痛并思痛

- 跨域问题
- src 赋予 Audio 时先检查资源状况，否则轮播到一半会…
- api 请求太不熟练了
- 组件间传值 😢

## 后续

- [x] 背景支持本地上传🖻
- [x] 优化音量控制条样式📢
- [x] 新增歌曲搜索功能
- [x] 主组件支持拖拽（没啥用，但感觉很叼）🐮
- [x] 播放收藏歌曲 右键红心💖
- [ ] 收藏歌曲本地保存
- [x] Error
- [x] 新增很多新bug
- [x] tooltip修复
- [x] 提示说明键
- [x] 背景模糊效果
- [x] less样式
- [ ] 移动端适配