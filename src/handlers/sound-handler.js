"use strict";

let isMuted = true;

const mute = (sound) => {
  stop(sound);
  sound.muted = isMuted;
};

export const play = (sound) => {
  if (isMuted) return;
  sound.currentTime = 0;
  sound.play();
};

export const stop = (sound) => {
  sound.pause();
};

export const changeMute = () => {
  const sounds = document.querySelectorAll("audio");
  isMuted = !isMuted;
  sounds.forEach(mute);
};
