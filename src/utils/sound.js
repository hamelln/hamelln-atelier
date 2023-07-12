export const play = (sound) => {
  sound.currentTime = 0;
  sound.play();
};

export const stop = (sound) => {
  sound.pause();
};

export const setupSound = () => {
  const defaultSound = document.getElementById("default-sound");
  const projectSound = document.getElementById("project-sound");
  const contactSound = document.getElementById("contact-sound");
  const projectStart = document.getElementById("game-start");
  const focusableNodes = document.querySelectorAll(".focusable");

  focusableNodes.forEach((node) => {
    node.addEventListener("focus", () => {
      if (node.closest("#project")) {
        play(projectSound);
      } else if (node.closest("#contact")) {
        play(contactSound);
      } else {
        play(defaultSound);
      }
    });

    node.addEventListener("click", () => {
      if (node.closest("#project")) {
        play(projectStart);
      }
    });
  });
};
