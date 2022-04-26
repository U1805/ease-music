<template>
  <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
    <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="me-auto">Error</strong>
        <small>just now</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast-dalay='3000'" aria-label="Close"></button>
      </div>
      <div class="toast-body">这首歌放不了哦（三秒后自动切换）</div>
    </div>
  </div>
</template>
