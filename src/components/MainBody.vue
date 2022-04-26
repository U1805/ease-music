<template>
  <div class="player">
    <audio id='mmAudio' ref="mmAudio" :src="src" @timeupdate="current" @ended="end" @error="error"></audio>
    <div class="top">
      <img class="cover" :src="info.picUrl" />
      <div class="control">
        <div class="control-item">
          <span class="circle">
            <i class="bi bi-heart-fill" ref="likeBtn" id="likeBtn" @click="like" @contextmenu="playLike"></i>
          </span>
        </div>
        <div class="control-item">
          <span class="circle">
            <i class="bi bi-music-note-list" data-bs-toggle="collapse" data-bs-target="#setting" aria-expanded="false" aria-controls="setting"></i>
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
        <div class="control-play"><i id="play_button" class="bi bi-play-circle" @click="play" ref="playBtn"></i></div>
      </div>
    </div>
    <div class="bottom">
      <div class="title">{{ info.song }}</div>
      <div class="singer">{{ info.singer }}</div>
      <div class="progress">
        <div class="time">{{ second2time(currentTime) }}-{{ second2time(totalTime) }}</div>
        <input type="range" class="form-range" id="customRange1" :value="currentTime" min="0" :max="totalTime" @mousemove="changeTime" />
      </div>
    </div>
  </div>
</template>

<script>
import { getAudio } from "@/api";
export default {
  data() {
    return {
      currentTime: 0,
      totalTime: 0,
    };
  },
  props: ["likelist",'loop'],
  computed: {      
    info:function(){
        return this.$store.state.info
      },
      src: function () {
        return getAudio(this.info.id);
      },
      isLiked: function(){
        if(this.likelist == undefined) return false
        return this.likelist.indexOf(this.info.id)!=-1
      },

    },
  methods: {
    second2time(time) {
      let m = parseInt(time / 60);
      let mm = m < 10 ? "0" + m : m;
      let s = parseInt(time % 60);
      let ss = s < 10 ? "0" + s : s;
      return mm + ":" + ss;
    },

    play() {
      this.$nextTick(() => (this.$refs.mmAudio.paused ? this.$refs.mmAudio.play() : this.$refs.mmAudio.pause()));
      this.$nextTick(()=>(this.$refs.playBtn.className = this.$refs.mmAudio.paused  ? "bi bi-play-circle":"bi bi-pause-circle"))
    },
    prev() {
      this.$parent.$parent.index--;
      if (this.$parent.$parent.index < 0) this.index = this.$parent.$parent.list.length - 1;
    },
    next() {
      this.$parent.$parent.index = (this.$parent.$parent.index + 1) % this.$parent.$parent.list.length;
    },
    like() {
      if(this.isLiked){
        this.$parent.$parent.Liked.splice(this.$parent.$parent.Liked.indexOf(this.info.id), 1)
      }else{
        this.$parent.$parent.Liked.push(this.info.id)
      }
    },
    current() {
      this.currentTime = this.$refs.mmAudio.currentTime;
      this.totalTime = this.$refs.mmAudio.duration;
    },
    changeTime() {
      this.$refs.mmAudio.currentTime = document.querySelector("#customRange1").value;
    },
    end() {
      switch (this.loop) {
        case "":
          this.currentTime = 0;break;
        case "listloop":
          this.next();break;
        case "loop":
          this.currentTime = 0;
          this.$refs.mmAudio.play();break;
        case "random":
          this.$parent.$parent.index = Math.floor(Math.random() * this.$parent.$parent.list.length);break;
        default:
          console.log("loop error");
      }
    },
    error() {
      var toastLiveExample = document.getElementById("liveToast");
      var toast = new bootstrap.Toast(toastLiveExample);
      toast.show();
      setTimeout(this.next(), 3000);
    },
    playLike(){
      if(this.isLiked) this.$emit('playLikes')
    }
  },
  watch: {
    isLiked() {
      this.$nextTick(() => (this.isLiked ? this.$refs.likeBtn.classList.add("active") : this.$refs.likeBtn.classList.remove("active")));
    },
  },
};
</script>
