"use strict";

import addClickAndEnterHandler from "../utils/addClickAndEnterHandler.js";
import { addSrcAndAlt, getByQuery } from "../utils/controllDOM.js";
import { changeMute } from "../utils/sound.js";

const setupMuteButton = () => {
  const muteButton = getByQuery(".mute-button");
  let isMuted = true;

  const srcMap = new Map([
    [true, "public/img/icons/mute.svg"],
    [false, "public/img/icons/speaker.svg"],
  ]);
  const altMap = new Map([
    [true, "mute button - crossed-out speaker icon"],
    [false, "unmute button - speaker icon"],
  ]);

  const handleMute = () => {
    isMuted = !isMuted;
    changeMuteImg();
    changeMute();
  };

  const changeMuteImg = () => {
    const src = srcMap.get(isMuted);
    const alt = altMap.get(isMuted);
    const img = document.createElement("img");
    addSrcAndAlt(img)(src)(alt);
    muteButton.innerHTML = "";
    muteButton.appendChild(img);
  };

  addClickAndEnterHandler(muteButton)(handleMute);
};

export default setupMuteButton;
