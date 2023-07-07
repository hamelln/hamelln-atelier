const setupMuteButton = () => {
  let isMuted = true;
  const sounds = document.querySelectorAll("audio");
  const muteButton = document.querySelector(".mute-button");

  sounds.forEach((sound) => {
    sound.muted = true;
  });

  muteButton.addEventListener("click", () => {
    const src = new Map();
    const alt = new Map();
    src.set(true, "public/img/icons/mute.svg");
    src.set(false, "public/img/icons/speaker.svg");
    alt.set(true, "mute button - crossed-out speaker icon");
    alt.set(false, "unmute button - speaker icon");
    isMuted = !isMuted;
    sounds.forEach((sound) => {
      sound.pause();
      sound.muted = isMuted;
    });

    const img = document.createElement("img");
    img.src = src.get(isMuted);
    img.alt = alt.get(isMuted);
    muteButton.innerHTML = "";
    muteButton.appendChild(img);
  });
};

export default setupMuteButton;
