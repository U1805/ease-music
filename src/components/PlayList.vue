<template>
    <div style="min-height: 120px; max-height: 100%;">
        <div class="collapse collapse-horizontal" id="playlist">
          <div class="card card-body " style="width: 300px;" >
            <div class="row pre-scrollable">
            <ol class="list-group">
                <li class="list-group-item" style="cursor: pointer;"
                    v-for="item in list"
                >{{ item.song }}</li>
            </ol>
        </div>
          </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['list']
}
</script>