<template>
  <div class="modal fade" id="exampleModal" tabindex="-1" data-bs-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">登录</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="fun" v-if="qr != ''"></button>
        </div>
        <div class="modal-body">
          <img id="qrImg" class="rounded mx-auto d-block" :src="qr" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" v-if="qr != ''" data-bs-dismiss="modal" @click="fun">close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["qr"],
  methods: {
    fun() {
      this.$emit("clearTimer");
    },
  },
};
</script>
