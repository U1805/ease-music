<template>
    <div class="player">
        <audio></audio>
        <div class="top">
            <img class="cover">
            <div class="control">
                <div class="control-item">
                    <span class="circle"><i class="bi bi-heart-fill"></i></span>
                    </div>
                <div class="control-item">
                    <span class="circle"><i class="bi bi-music-note-list"
                        data-toggle="tooltip" data-placement="right" title="歌单"
                        data-bs-toggle="collapse" data-bs-target="#setting" aria-expanded="false" aria-controls="setting"
                        ></i></span>
                    </div>
                <div class="control-item">
                    <span class="circle"><i class="bi bi-skip-start-fill" style="font-size: 40px;"></i></span>
                </div>
                <div class="control-item">
                    <span class="circle"><i class="bi bi-skip-end-fill" style="font-size: 40px;"></i></span>
                </div>
                <div class="control-play">
                    <i id="play_button" class="bi bi-play-circle"></i>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="title">song</div>
            <div class="singer">singer</div>
            <div class="progress">
                <div class="time">currentTime-totalTime</div>
                <input type="range" class="form-range" id="customRange1" min="0">
                
            </div>
        </div>
    </div>
</template>