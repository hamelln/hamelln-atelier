"use strict";

import addClickAndEnterHandler from "../utils/addClickAndEnterHandler.js";
import { changeMute } from "../utils/sound.js";

const setupMuteButton = () => {
  const muteButton = document.querySelector(".mute-button");
  let isMuted = true;

  const src = new Map([
    [true, "public/img/icons/mute.svg"],
    [false, "public/img/icons/speaker.svg"],
  ]);
  const alt = new Map([
    [true, "mute button - crossed-out speaker icon"],
    [false, "unmute button - speaker icon"],
  ]);

  const handleMute = () => {
    isMuted = !isMuted;
    changeMuteImg();
    changeMute();
  };

  const changeMuteImg = () => {
    const img = document.createElement("img");
    img.src = src.get(isMuted);
    img.alt = alt.get(isMuted);
    muteButton.innerHTML = "";
    muteButton.appendChild(img);
  };

  addClickAndEnterHandler(muteButton)(handleMute);
};

export default setupMuteButton;
