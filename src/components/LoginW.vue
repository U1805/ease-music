<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">登录</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="clearTimer"></button>
        </div>
        <div class="modal-body">
            <img id="qrImg" class="rounded mx-auto d-block" :src='qr'/>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">close</button>
        </div>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    props:['qr'],
    methods:{
        clearTimer(){
            
        }
    }
}
</script>