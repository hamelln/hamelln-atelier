"use strict";

const setupMuteButton = () => {
  let isMuted = true;
  const sounds = document.querySelectorAll("audio");
  const muteButton = document.querySelector(".mute-button");
  const src = new Map([
    [true, "public/img/icons/mute.svg"],
    [false, "public/img/icons/speaker.svg"],
  ]);
  const alt = new Map([
    [true, "mute button - crossed-out speaker icon"],
    [false, "unmute button - speaker icon"],
  ]);

  const handleMute = () => {
    changeMute();
    changeMuteImg();
  };

  const changeMute = () => {
    isMuted = !isMuted;
    sounds.forEach((sound) => {
      sound.pause();
      sound.muted = isMuted;
    });
  };

  const getSrc = () => src.get(isMuted);
  const getAlt = () => alt.get(isMuted);

  const changeMuteImg = () => {
    const img = document.createElement("img");
    img.src = getSrc();
    img.alt = getAlt();
    muteButton.innerHTML = "";
    muteButton.appendChild(img);
  };

  const handleEnter = (e) => {
    e.key === "Enter" && handleMute();
  };

  muteButton.addEventListener("click", handleMute);
  muteButton.addEventListener("keydown", handleEnter);
};

export default setupMuteButton;
