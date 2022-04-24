<template>
    <div style="min-height: 120px;">
        <div class="collapse collapse-horizontal" id="setting">
        <div class="card card-body" style="width: 300px;">
            <div class="input-group  mb-3">
                <span class="input-group-text" id="basic-addon1">登录</span>
                <button type="button" class="btn btn-light"
                data-bs-toggle="modal" data-bs-target="#exampleModal">网易云音乐</button>
                <button type="button" class="btn btn-light" disabled>酷我音乐</button>
            </div>
            <div class="input-group  mb-3">
                <span class="input-group-text" id="basic-addon1" >背景</span>
                <input type="text" class="form-control" placeholder="Url" aria-label="0-100" aria-describedby="basic-addon1">
            </div>
            <div class="input-group  mb-3">
                <span class="input-group-text" id="basic-addon1">音量</span>
                <input type="text" class="form-control" placeholder="0-100" aria-label="0-1" aria-describedby="basic-addon1">
            </div>
            <div class="input-group  mb-3">
                <span class="input-group-text" id="basic-addon1">播放</span>
                <select class="form-select" aria-label="Default select example">
                    <option value="loop">单曲循环</option>
                    <option value="listloop">列表循环</option>
                    <option value="random">随机播放</option>
                </select>
            </div>
            <div class="input-group  mb-3">
                <span class="input-group-text" id="basic-addon1"
                data-toggle="tooltip" data-placement="left" title="登录后单击可导入歌单" style="cursor: pointer;">歌单</span>
                <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="6722704953">
                <datalist id="datalistOptions">
                    <!-- <data-list
                        v-for="item in Mylist"
                        :value="item.listId"
                        v-bind:list="item"
                    ></data-list> -->
                </datalist>
                <button type="button" class="btn btn-light">导入</button>
            </div>
            <button type="button" class="btn btn-light"
            data-bs-toggle="collapse" data-bs-target="#playlist" aria-expanded="false">播放列表</button>
        </div>
        </div>
    </div>
</template>