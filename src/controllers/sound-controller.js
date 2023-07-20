import isMobile from "../handlers/mobile-recognizer.js";
import { play } from "../handlers/sound-handler.js";

const setupSound = () => {
  const defaultSound = document.getElementById("default-sound");
  const projectSound = document.getElementById("project-sound");
  const contactSound = document.getElementById("contact-sound");
  const focusableElements = document.querySelectorAll(".focusable");
  const event = isMobile() ? "click" : "focus";

  focusableElements.forEach((element) => {
    element.addEventListener(event, () => {
      if (element.closest("#project")) {
        play(projectSound);
      } else if (element.closest("#contact")) {
        play(contactSound);
      } else {
        play(defaultSound);
      }
    });
  });
};

export default setupSound;
