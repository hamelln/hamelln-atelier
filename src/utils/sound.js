import isMobile from "./isMobile.js";

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

export const setupSound = () => {
  const defaultSound = document.getElementById("default-sound");
  const projectSound = document.getElementById("project-sound");
  const contactSound = document.getElementById("contact-sound");
  const focusableElements = document.querySelectorAll(".focusable");
  const event = isMobile() ? "click" : "focus";

  focusableElements.forEach((element) => {
    element.addEventListener(event, () => {
      if (element.closest("#project")) {
        play(projectSound);
      } else if (element.closest("#contact")) {
        play(contactSound);
      } else {
        play(defaultSound);
      }
    });
  });
};
