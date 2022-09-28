const video = document.querySelector("video");
const videoContainer = document.querySelector('.video-container')

//  Play AND PAUSE
const btnPlayPause = document.querySelector(".play-toggler");
const btnPlayPauseImg = document.querySelector(".play-toggler img");

video.addEventListener("click", togglePlay);
btnPlayPause.addEventListener("click", togglePlay);

function togglePlay() {
  if (video.paused) {
    video.play();
    btnPlayPauseImg.src = "ressources/pause.svg";
  } else {
    video.pause();
    btnPlayPauseImg.src = "ressources/play.svg";
  }
}

// MUTE AND UNMUTE BTN
const btnMute = document.querySelector(".mute-btn");
const btnMuteImg = document.querySelector(".mute-btn img");

btnMute.addEventListener("click", () => {
  if (video.muted) {
    video.muted = false;
    btnMuteImg.src = "ressources/unmute.svg";
  } else {
    video.muted = true;
    btnMuteImg.src = "ressources/mute.svg";
  }
});

//  FULL SCREEN BTN
const btnFullScreen = document.querySelector(".fullscreen-toggler");

video.addEventListener('dblclick', toggleFullScreen);
btnFullScreen.addEventListener("click", toggleFullScreen);

function toggleFullScreen(){
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else  {
    videoContainer.requestFullscreen();
  } 
};

// change the volume with the input
const InputVolume = document.querySelector(".volume-slider");

InputVolume.addEventListener("input", () => {
  video.volume = InputVolume.value / 100;

  if (video.volume === 0) {
    btnMuteImg.src = "ressources/mute.svg";
  } else {
    btnMuteImg.src = "ressources/unmute.svg";
  }
});

// duration of the video
const timerDisplay = document.querySelectorAll(".time-display");

video.addEventListener("loadeddata", fillDurationVariables);
window.addEventListener("load", fillDurationVariables);

let current;
let totalDuration;

function fillDurationVariables() {
  if (Number.isNaN(video.duration)) return;

  current = video.currentTime;
  totalDuration = video.duration;

  formatValue(current, timerDisplay[0]);
  formatValue(totalDuration, timerDisplay[1]);

  video.removeEventListener("loadeddata", fillDurationVariables);
  window.removeEventListener("load", fillDurationVariables);
}

function formatValue(val, element) {
  const currentMin = Math.trunc(val / 60);
  let currentSec = Math.trunc(val % 60);

  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }

  element.textContent = `${currentMin}:${currentSec}`;
}

// currentTime of the video + progress bar
const progress = document.querySelector(".progress");

video.addEventListener("timeupdate", handleTimeUpdate);

function handleTimeUpdate() {
  current = video.currentTime;

  formatValue(current, timerDisplay[0]);

  const currentProgress = current / totalDuration;

  progress.style.transform = `scaleX(${currentProgress})`;

  if (video.ended) {
    btnPlayPauseImg.src = "ressources/play.svg";
  }
}

const progressBar = document.querySelector(".progress-bar");

let rect = progressBar.getBoundingClientRect();
let largeur = rect.width;

window.addEventListener("resize", handleResize);

function handleResize() {
  rect = progressBar.getBoundingClientRect();
  largeur = rect.width;
}

progressBar.addEventListener('click', (e) => {
  const x = e.clientX - rect.left;

  const widthPercent = x / largeur;

  video.currentTime = video.duration * widthPercent;
})
