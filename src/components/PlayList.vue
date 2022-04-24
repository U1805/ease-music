<template>
    <div style="min-height: 120px; max-height: 100%;">
        <div class="collapse collapse-horizontal" id="playlist">
          <div class="card card-body " style="width: 300px;" >
            <div class="row pre-scrollable">
            <ol class="list-group">
                <!-- <play-list
                    v-for="item in list"
                    v-bind:list="item"
                    :value="item.key"
                    @click="changeSong"
                ></play-list> -->
            </ol>
        </div>
          </div>
        </div>
    </div>
</template>
<script>
// const playList = {
//   props: ['list'],
//   template: `<li class="list-group-item" style="cursor: pointer;">{{ list.song }} - {{ list.singer }}</li>`
// }
export default {

}
</script>