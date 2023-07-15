"use strict";

import addClickAndEnterHandler from "../utils/addClickAndEnterHandler.js";
import { makeImg } from "../utils/controllDOM.js";
import { changeMute } from "../utils/sound.js";

const setupMuteButton = () => {
  const muteButton = document.querySelector(".mute-button");
  let isMuted = true;

  const srcMap = new Map([
    [true, "public/img/icons/mute.svg"],
    [false, "public/img/icons/unmute.svg"],
  ]);
  const altMap = new Map([
    [true, "mute button - crossed-out unmute icon"],
    [false, "unmute button - unmute icon"],
  ]);

  const handleMute = () => {
    isMuted = !isMuted;
    changeMuteImg();
    changeMute();
  };

  const changeMuteImg = () => {
    const src = srcMap.get(isMuted);
    const alt = altMap.get(isMuted);
    const img = makeImg()(src, alt);
    muteButton.innerHTML = "";
    muteButton.appendChild(img);
  };

  addClickAndEnterHandler(muteButton)(handleMute);
};

export default setupMuteButton;
