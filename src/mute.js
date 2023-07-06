const setupMuteButton = () => {
  let isMuted = true;
  const sounds = document.querySelectorAll("audio");
  const muteButton = document.querySelector(".mute-button");

  sounds.forEach((sound) => {
    sound.muted = true;
  });
  muteButton.addEventListener("click", () => {
    isMuted = !isMuted;
    sounds.forEach((sound) => {
      sound.pause();
      sound.muted = isMuted;
    });

    let src = isMuted
      ? "public/img/icons/mute.svg"
      : "public/img/icons/speaker.svg";

    const alt = isMuted
      ? "mute button - crossed-out speaker icon"
      : "unmute button - speaker icon";

    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    muteButton.innerHTML = "";
    muteButton.appendChild(img);
  });
};

export default setupMuteButton;
