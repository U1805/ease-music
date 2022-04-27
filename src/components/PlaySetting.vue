<template>
  <div style="min-height: 120px">
    <div class="collapse collapse-horizontal" id="setting">
      <div class="card card-body" style="width: 300px">
        <div class="input-group mb-3">
          <span class="input-group-text">登录</span>
          <button class="btn btn-light" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="login">网易云音乐</button>
          <button class="btn btn-light" disabled>酷我音乐</button>
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" data-bs-toggle="collapse" href="#collapseExample" style="cursor: pointer">背景</span>
          <input type="text" class="form-control" placeholder="Url" v-model="background" />
          <button class="btn btn-light bi bi-camera" id="upload-img" onclick="document.querySelector('#upload-btn').click()"></button>
          <input type="file" id="upload-btn" @change="File" accept="image/*" />
          <div class="collapse" id="collapseExample">
            <div class="card card-body">
              <label class="form-check-label" for="flexCheckChecked"> 毛玻璃 </label>
              <div class="input-group mb-3">
                <div class="input-group-text"><input class="form-check-input mt-0" type="checkbox" v-model="checked" checked /></div>
                <input type="text" class="form-control" v-model="blur" /><span class="input-group-text">px</span>
              </div>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">音量</span>
          <input type="text" class="form-control" placeholder="0-100" v-model="volume" id="volume" />
          <input type="range" class="form-range" id="v-range" min="0" max="100" :value="volume" @mousemove="changeVolume" />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">播放</span>
          <select class="form-select" v-model="loop">
            <option value="loop">单曲循环</option>
            <option value="listloop">列表循环</option>
            <option value="random">随机播放</option>
          </select>
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1" @click="getMyList">歌单 <span class="tooltiptext">登录后单击可导入歌单</span></span>
          <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="搜索歌曲##数量" ref="searchBar" />
          <datalist id="datalistOptions">
            <option v-for="item in Mylist" :value="item.listId">
              {{ item.listName }}
            </option>
          </datalist>
          <button class="btn btn-light" @click="search" ref="searchBtn">Go!</button>
        </div>
        <button class="btn btn-light" data-bs-toggle="collapse" data-bs-target="#playlist">播放列表</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getLoginStatus, checkStatus, getUserList, getList, search, getDetail } from "@/api";
import requests from "@/api/request.js";

export default {
  data() {
    return {
      res: null,
      Mylist: [],
      background: "",
      loop: "",
      volume: 40,
      timer: null,
      checked: true,
      blur: 3,
    };
  },

  methods: {
    login: async function () {
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
      var that = this;
      that.timer = setInterval(async () => {
        const statusRes = await checkStatus(key);
        if (statusRes.code == 800) {
          alert("二维码已过期,请重新获取");
          clearInterval(that.timer);
        }
        if (statusRes.code == 803) {
          // 这一步会返回cookie
          // console.log(JSON.stringify(statusRes, null, 2))
          clearInterval(that.timer);
          alert("授权登录成功");
          await getLoginStatus();
          window.location.reload();
        }
      }, 3000);
    },
    clearT() {
      clearTimeout(this.timer);
    },
    async getMyList() {
      if (localStorage.getItem("uid") == null) {
        alert("请先登录！");
        return;
      }
      this.res = await getUserList(localStorage.getItem("uid"));

      let Mylist = [];
      this.res.playlist.map((item) => {
        Mylist.push({ listId: item.id, listName: item.name });
      });
      this.Mylist = Mylist;
    },
    async search() {
      document.querySelector("#play_button").className = "bi bi-play-circle";
      document.querySelector("#mmAudio").pause();
      var that = this,
        res = null;
      this.$refs.searchBar.disabled = true;
      this.$refs.searchBtn.disabled = true;
      this.$refs.searchBtn.innerHTML = `<div class="spinner-border spinner-border-sm" role="status"><span class="visually-hidden">Loading...</span></div>`;
      let t = document.querySelector("#exampleDataList").value;
      let query = t == "" ? "6722704953" : t;
      var pattern = /^[0-9]*$/;
      try {
        res = pattern.test(query) ? (await getList(query)).songs : (await search(query.split("##")[0], query.split("##")[1])).result.songs;
        that.$parent.list = [];

        Promise.all(
          res.map(async function (item, index) {
            let r = (await getDetail(item.id)).songs[0];
            that.$parent.list.push({ song: r.name, singer: r.ar[0].name, id: item.id, picUrl: r.al.picUrl });
            if (index == 0) that.$store.commit("showInfo", { song: r.name, singer: r.ar[0].name, id: item.id, picUrl: r.al.picUrl });
          })
        ).then(() => {
          that.$refs.searchBar.disabled = false;
          that.$refs.searchBtn.disabled = false;
          that.$refs.searchBtn.innerHTML = "Go!";
        });
      } catch (err) {
        alert("出问题惹，换一个试试吧");
        window.location.reload();
      }
    },

    File() {
      const file = document.querySelector("#upload-btn").files[0];
      if (file.size > 1048576) {
        alert("目前不建议上传大于 1MB 的图片！");
        return;
      }
      const reader = new FileReader();
      var that = this;
      reader.addEventListener("load", () => {
        that.background = reader.result; // 将图像文件转换为 base64 字符串
      });
      if (file) {
        reader.readAsDataURL(file);
      }
    },

    changeVolume() {
      this.volume = document.querySelector("#v-range").value;
    },
  },

  watch: {
    background() {
      document.querySelector("#app > div.background").style.backgroundImage = `url(${this.background})`;
    },
    loop() {
      this.$parent.loop = this.loop;
    },
    volume() {
      document.querySelector("#mmAudio").volume = this.volume / 100;
    },
    checked() {
      let n = this.checked ? this.blur : 0;
      document.querySelector("#app > div.background").style.filter = `blur(${n}px)`;
    },
    blur() {
      let n = this.checked ? this.blur : 0;
      document.querySelector("#app > div.background").style.filter = `blur(${n}px)`;
    },
  },
};
</script>

<style scoped lang="less">
#upload-img {
  font-size: 15px;
}
#upload-btn {
  display: none;
}
.form-check-input:checked {
  @color:rgba(118, 134, 156);
  background-color: @color;
  border-color: @color;
}
#basic-addon1 {
  cursor: pointer;
  .tooltiptext {
    font-size: 13px;
    visibility: hidden;
    width: 150px;
    background-color: rgba(0, 0, 0, 0.559);
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    /* 定位 */
    position: absolute;
    z-index: 1;
    right: 105%;
    /* 淡入 */
    opacity: 0;
    transition: opacity 1s;
  }
  &:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
  .tooltiptext::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 100%;
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent transparent rgba(0, 0, 0, 0.559);
  }
}
</style>
