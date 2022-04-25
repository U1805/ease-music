<template>
  <div class="background" id="player">
    <login-w :qr='qr'></login-w>
    <play-list></play-list>
    <main-body :id="id"></main-body>
    <play-setting></play-setting>
  </div>
</template>

<script>
import MainBody from './components/MainBody.vue'
import PlaySetting from './components/PlaySetting.vue'
import PlayList from './components/PlayList.vue'
import LoginW from './components/LoginW.vue'
export default {
  name: 'App',
  data() {
    return {
      index: 0,
      Mylist:[],
      list: [1856722728, 2, 3],
      qr:'',
    }
  },
  methods: {},
  components: {
    MainBody,
    PlaySetting,
    PlayList,
    LoginW
  },
  computed: {
    id: function () {
      return this.list[this.index]
    }
  }
}
</script>

<style></style>
