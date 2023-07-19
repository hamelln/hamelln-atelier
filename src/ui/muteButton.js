"use strict";

import addClickAndEnterHandler from "../utils/addClickAndEnterHandler.js";
import createElement from "../utils/createElement.js";
import { changeMute } from "../utils/sound.js";

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
  const muteButton = document.querySelector(".mute-button");

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
    const img = createElement("img", { src, alt });
    muteButton.innerHTML = "";
    muteButton.appendChild(img);
  };

  addClickAndEnterHandler(muteButton)(handleMute);
  document.body.addEventListener("keydown", (e) => {
    if (e.key === "x" || e.key === "X") {
      handleMute();
    }
  });
};

export default setupMuteButton;
