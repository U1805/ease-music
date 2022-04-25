<template>
  <div class="containe" id="player">
    <play-list></play-list>
    <main-body :id="id"></main-body>
    <play-setting></play-setting>
  </div>
</template>

<script>
import MainBody from './components/MainBody.vue'
import PlaySetting from './components/PlaySetting.vue'
import PlayList from './components/PlayList.vue'
export default {
  name: 'App',
  data() {
    return {
      index: 0,
      list: [1856722728, 2, 3]
    }
  },
  methods: {},
  components: {
    MainBody,
    PlaySetting,
    PlayList
  },
  computed: {
    id: function () {
      return this.list[this.index]
    }
  }
}
</script>

<style></style>
