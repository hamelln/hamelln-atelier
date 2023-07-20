"use strict";

import addClickAndEnterHandler from "../handlers/click-enter-handler.js";
import { changeMute } from "../handlers/sound-handler.js";
import createElement from "../handlers/element-creater.js";

let isMuted = true;
let isFirstClick = true;
const SRC_MAP = new Map([
  [true, "public/img/icons/mute.svg"],
  [false, "public/img/icons/unmute.svg"],
]);
const ALT_MAP = new Map([
  [true, "mute button - crossed-out unmute icon"],
  [false, "unmute button - unmute icon"],
]);

const setupMuteButton = (setupSound) => {
  const muteButton = document.querySelector(".mode__mute");

  const setupSoundWhenFirstClick = () => {
    isFirstClick = false;
    setupSound();
  };

  const handleMute = () => {
    isFirstClick && setupSoundWhenFirstClick();
    isMuted = !isMuted;
    changeMuteImg();
    changeMute();
  };

  const changeMuteImg = () => {
    const src = SRC_MAP.get(isMuted);
    const alt = ALT_MAP.get(isMuted);
    const img = createElement("img", { class: "mode__mute__image", src, alt });
    muteButton.innerHTML = "";
    muteButton.appendChild(img);
  };

  addClickAndEnterHandler(muteButton)(handleMute);
  document.body.addEventListener("keydown", ({ code }) => {
    if (code === "KeyX") muteButton.click();
  });
};

export default setupMuteButton;
