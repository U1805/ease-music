<template>
  <div class="player">
    <audio ref="mmAudio" :src="src" @timeupdate="current" @ended="end" :volume="volume / 100"></audio>
    <div class="top">
      <img class="cover" :src="picUrl" />
      <div class="control">
        <div class="control-item">
          <span class="circle">
            <i class="bi bi-heart-fill" ref="likeBtn" id="likeBtn" @click="like" @contextmenu="playLike"></i>
          </span>
        </div>
        <div class="control-item">
          <span class="circle">
            <i
              class="bi bi-music-note-list"
              data-toggle="tooltip"
              data-placement="right"
              title="歌单"
              data-bs-toggle="collapse"
              data-bs-target="#setting"
              aria-expanded="false"
              aria-controls="setting"
            ></i>
          </span>
        </div>
        <div class="control-item">
          <span class="circle">
            <i class="bi bi-skip-start-fill" style="font-size: 40px" @click="prev"></i>
          </span>
        </div>
        <div class="control-item">
          <span class="circle">
            <i class="bi bi-skip-end-fill" style="font-size: 40px" @click="next"></i>
          </span>
        </div>
        <div class="control-play">
          <i id="play_button" class="bi bi-play-circle" @click="play" ref="playBtn"></i>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="title">{{ song }}</div>
      <div class="singer">{{ singer }}</div>
      <div class="progress">
        <div class="time">{{ second2time(currentTime) }}-{{ second2time(totalTime) }}</div>
        <input type="range" class="form-range" id="customRange1" :value="currentTime" min="0" :max="totalTime" @mousemove="changeTime" />
      </div>
    </div>
  </div>
</template>

<script>
import { getDetail, getAudio } from "@/api";
export default {
  data() {
    return {
      index: 0,
      info: null,
      currentTime: 0,
      totalTime: 0,
      Liked: new Map(),
    };
  },
  props: ["id", "isLike", "loop", "volume"],

  methods: {
    second2time(s) {
      let m = parseInt(s / 60);
      let mm = m < 10 ? "0" + m : m;
      let ss = parseInt(s % 60);
      let sss = ss < 10 ? "0" + ss : ss;
      return mm + ":" + sss;
    },
    play() {
      this.$nextTick(function () {
        if (this.$refs.mmAudio.paused) {
          this.$refs.mmAudio.play();
          this.$refs.playBtn.className = "bi bi-pause-circle";
        } else {
          this.$refs.mmAudio.pause();
          this.$refs.playBtn.className = "bi bi-play-circle";
        }
      });
    },
    prev() {
      this.index--;
      if (this.index < 0) this.index = this.$parent.list.length - 1;
      this.$parent.index = this.index;
    },
    next() {
      this.index = (this.index + 1) % this.$parent.list.length;
      this.$parent.index = this.index;
    },
    like() {
      let idd = this.id;
      if (this.Liked.get(idd) == null) {
        this.Liked.set(idd, true);
        this.$refs.likeBtn.classList.add("active");
      } else if (this.Liked.get(idd)) {
        this.Liked.delete(idd);
        this.$refs.likeBtn.classList.remove("active");
      }
    },
    current() {
      this.currentTime = this.$refs.mmAudio.currentTime;
      this.totalTime = this.$refs.mmAudio.duration;
    },
    changeTime() {
      this.$refs.mmAudio.currentTime = document.querySelector("#customRange1").value;
    },
    async detail() {
      this.info = (await getDetail(this.id)).songs[0];
      console.log(this.info);
    },
    end() {
      // alert("The video has ended");
      if (this.loop == "") {
        this.currentTime = 0;
        this.$refs.playBtn.className = "bi bi-pause-circle";
      } else if (this.loop == "listloop") {
        this.next();
      } else if (this.loop == "loop") {
        this.currentTime = 0;
        this.$refs.mmAudio.play();
      } else {
        this.$parent.index = Math.floor(Math.random() * this.$parent.list.length);
      }
    },
    playLike() {
      // alert(123)
      var that = this,
        i = 0;
      that.$parent.list = [];
      let arr = Array.from(this.Liked).map((item) => item[0]);
      // console.log(arr)
      arr.map(async function (item) {
        let r = (await getDetail(item)).songs[0];
        // console.log(that.$parent.list)
        that.$parent.list.push({ index: i++, song: r.name, singer: r.ar[0].name, id: item });
      });
      // this.$parent.index = 0
    },
  },

  computed: {
    src: function () {
      return getAudio(this.id);
    },
    song: function () {
      if (this.info != null) return this.info.name;
      else return "";
    },
    singer: function () {
      if (this.info != null) return this.info.ar[0].name;
      else return "";
    },
    picUrl: function () {
      if (this.info != null) return this.info.al.picUrl;
      else return "https://www.xuanzhuji.com/wp-content/uploads/2022/02/781ee360b9bf7af07f7342b9a0e188c4.png";
    },
  },
  mounted() {
    this.detail();
  },
};
</script>
