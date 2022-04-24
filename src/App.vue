<template>
  <div class="containe" id="player">
    <play-list></play-list>
    <main-body></main-body>
    <play-setting></play-setting>
  </div>
</template>

<script>
import MainBody from "./components/MainBody.vue";
import PlaySetting from "./components/PlaySetting.vue";
import PlayList from "./components/PlayList.vue";
export default {
  name: "App",
  components: {
    MainBody,
    PlaySetting,
    PlayList,
  },
};
</script>

<style>
</style>
