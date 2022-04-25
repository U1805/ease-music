<template>
  <div style="min-height: 120px">
    <div class="collapse collapse-horizontal" id="setting">
      <div class="card card-body" style="width: 300px">
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">登录</span>
          <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="login">网易云音乐</button>
          <button type="button" class="btn btn-light" disabled>酷我音乐</button>
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">背景</span>
          
          <input type="text" class="form-control" placeholder="Url" aria-label="0-100" aria-describedby="basic-addon1" v-model="background"/>
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">音量</span>
          <input type="text" class="form-control" placeholder="0-100" aria-label="0-1" aria-describedby="basic-addon1" />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">播放</span>
          <select class="form-select" aria-label="Default select example">
            <option value="loop">单曲循环</option>
            <option value="listloop">列表循环</option>
            <option value="random">随机播放</option>
            <option value="like">播放收藏</option>
          </select>
        </div>
        <div class="input-group mb-3">
          <span
            class="input-group-text"
            id="basic-addon1"
            data-toggle="tooltip"
            data-placement="left"
            title="登录后单击可导入歌单"
            style="cursor: pointer"
            @click="getMyList"
            >歌单</span
          >
          <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="搜索歌曲##数量" />
          <datalist id="datalistOptions">
            <option v-for="item in Mylist" :value="item.listId">
              {{ item.listName }}
            </option>
          </datalist>
          <button type="button" class="btn btn-light" @click="search">Go!</button>
        </div>
        <button type="button" class="btn btn-light" data-bs-toggle="collapse" data-bs-target="#playlist" aria-expanded="false">播放列表</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getLoginStatus, checkStatus, getUserList, getList,search} from "@/api";
import requests from "@/api/request.js";
import { getDetail } from "../api";
export default {
  data() {
    return {
      res: null,
      Mylist: [],
      background:''
    };
  },

  methods: {
    login: async function () {
      let timer;
      getLoginStatus();
      const res = await requests({
        url: `https://netease-cloud-music-api-khaki-chi.vercel.app/login/qr/key?timerstamp=${Date.now()}`,
        withCredentials: true, //关键
      });
      const key = res.data.unikey;
      const res2 = await requests({
        url: `https://netease-cloud-music-api-khaki-chi.vercel.app/login/qr/create?key=${key}&qrimg=true&timerstamp=${Date.now()}`,
        withCredentials: true, //关键
      });
      this.$parent.qr = res2.data.qrimg;

      timer = setInterval(async () => {
        const statusRes = await checkStatus(key);
        if (statusRes.code === 800) {
          alert("二维码已过期,请重新获取");
          clearInterval(timer);
        }
        if (statusRes.code === 803) {
          // 这一步会返回cookie
          // console.log(JSON.stringify(statusRes, null, 2))
          clearInterval(timer);
          alert("授权登录成功");
          await getLoginStatus();
          window.location.reload();
        }
      }, 3000);
    },
    async getMyList() {
      this.res = await getUserList(localStorage.getItem("uid"));
      // console.log(this.res)
      let Mylist = [];
      this.res.playlist.map((item) => {
        Mylist.push({ listId: item.id, listName: item.name });
      });
      this.Mylist = Mylist;
    },
    async search() {
      var that = this, res = null, i = 0;

      let t = document.querySelector("#exampleDataList").value;
      let query = (t == "" )? "6722704953" : t;
      var pattern = /^[0-9]*$/;
      res = pattern.test(query)? (await getList(query)).playlist.trackIds: (await search(query.split('##')[0],query.split('##')[1])).result.songs
            that.$parent.list=[]
      res.map(async function (item) {
        let r = (await getDetail(item.id)).songs[0];
        that.$parent.list.push({ index: i++, song: r.name, singer: r.ar[0].name, id: item.id });
      });
    },
  },

  watch:{
    background(){
        document.querySelector("body").style.backgroundImage = `url(${this.background})`;
    }
  }
};
</script>
