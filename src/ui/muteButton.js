"use strict";

import addClickAndEnterHandler from "../utils/addClickAndEnterHandler.js";
import createElement from "../utils/createElement.js";
import { changeMute } from "../utils/sound.js";

let isMuted = true;
let isFirstClick = true;

const setupMuteButton = (setupSound) => {
  const muteButton = document.querySelector(".mute-button");
  const setupSoundWhenFirstClick = () => {
    isFirstClick = false;
    setupSound();
  };

  const srcMap = new Map([
    [true, "public/img/icons/mute.svg"],
    [false, "public/img/icons/unmute.svg"],
  ]);
  const altMap = new Map([
    [true, "mute button - crossed-out unmute icon"],
    [false, "unmute button - unmute icon"],
  ]);

  const handleMute = () => {
    if (isFirstClick) setupSoundWhenFirstClick();
    isMuted = !isMuted;
    changeMuteImg();
    changeMute();
  };

  const changeMuteImg = () => {
    const src = srcMap.get(isMuted);
    const alt = altMap.get(isMuted);
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
