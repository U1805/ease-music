<template>
  <div class="background" id="player">
    <error-window></error-window>
    <login-w :qr="qr" @clearTimer="clear"></login-w>
    <play-list :list="list"></play-list>
    <Vue3DraggableResizable :draggable="true" :resizable="false" style="border: none" :x="500" :y="250">
      <main-body ref="child" :loop="loop" :likelist="Liked" @playLikes="likelistt"></main-body>
    </Vue3DraggableResizable>
    <play-setting ref="timer"></play-setting>
  </div>
</template>

<script>
import MainBody from "./components/MainBody.vue";
import PlaySetting from "./components/PlaySetting.vue";
import PlayList from "./components/PlayList.vue";
import LoginW from "./components/LoginW.vue";
import ErrorWindow from "./components/ErrorWindow.vue";
import { getDetail } from "@/api";

export default {
  name: "App",
  components: {
    MainBody,
    PlaySetting,
    PlayList,
    LoginW,
    ErrorWindow,
  },
  data() {
    return {
      index: 0,
      list: [{ song: "Stay Light", singer: "Niha", id: 29392941, picUrl: "http://p1.music.126.net/inLyNRNb8tdNYV8Fhn9UQA==/109951165777935908.jpg" }], //song, singer, id, picurl
      Liked: [],
      qr: "",
      loop: "",
    };
  },
  methods: {
    clear() {
      this.$refs.timer.clearT();
    },
    likelistt() {
      // console.log(this.Liked)
      document.querySelector("#play_button").className = "bi bi-play-circle";
      document.querySelector("#mmAudio").pause();
      var that = this;
      this.list = [];
      this.Liked.map(async function (item, index) {
        let r = (await getDetail(item)).songs[0];
        that.list.push({ song: r.name, singer: r.ar[0].name, id: item, picUrl: r.al.picUrl });
        if (index == 0) that.$store.commit("showInfo", { song: r.name, singer: r.ar[0].name, id: item, picUrl: r.al.picUrl });
      });
      // that.index = 0
    },
  },

  watch: {
    index() {
      this.$store.commit("showInfo", this.list[this.index]);
      this.$refs.child.play();
    },
  },
};
</script>

<style></style>
