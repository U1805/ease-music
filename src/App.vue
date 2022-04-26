<template>
  <div class="background" id="player">
    <login-w :qr="qr"></login-w>
    <play-list :list="list"></play-list>
    <Vue3DraggableResizable :draggable="true" :resizable="false" style="border:none;" :x="500" :y="250">
      <main-body :id="id" :index="index" ref="child" :loop="loop" :volume="volume" :list="list" @changeIndex="changeMsgFn"></main-body>
    </Vue3DraggableResizable>
    <play-setting></play-setting>
  </div>
</template>

<script>
import MainBody from "./components/MainBody.vue";
import PlaySetting from "./components/PlaySetting.vue";
import PlayList from "./components/PlayList.vue";
import LoginW from "./components/LoginW.vue";
export default {
  name: "App",
  data() {
    return {
      index: 0,
      list: [{ index: 9, song: "好きだから。", singer: "『ユイカ』", id: 1856722728 }],
      qr: "",
      loop: "",
      volume: 40,
    };
  },
  methods: {
    changeMsgFn(value) {
      this.index = value;
    },
  },
  components: {
    MainBody,
    PlaySetting,
    PlayList,
    LoginW,
  },
  computed: {
    id: function () {
      // console.log(this.list)
      if (this.list[0]) {
        return this.list[this.index]["id"];
      }
    },
  },
  watch: {
    index() {
      if (this.list[0]) {
        this.$nextTick(() => this.$refs.child.detail());
        this.$nextTick(() => this.$refs.child.play());
        if (this.$refs.child.Liked.get(this.id) == null) {
          document.querySelector("#likeBtn").classList.remove("active");
        } else {
          document.querySelector("#likeBtn").classList.add("active");
        }
      }
    },
  },
};
</script>

<style></style>
