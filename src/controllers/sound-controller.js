import isMobile from "../handlers/mobile-recognizer.js";
import { play } from "../handlers/sound-handler.js";

const setupSound = () => {
  const defaultSound = document.getElementById("default-sound");
  const projectSound = document.getElementById("project-sound");
  const contactSound = document.getElementById("contact-sound");
  const focusableElements = document.querySelectorAll(".focusable");
  const event = isMobile() ? "click" : "focus";

  focusableElements.forEach((element) => {
    const playSectionSound = () => {
      const sectionId = element.closest("section")?.id;
      switch (sectionId) {
        case "project":
          play(projectSound);
          break;
        case "contact":
          play(contactSound);
          break;
        default:
          if (
            element.classList.contains("mode__mute") ||
            element.classList.contains("mode__theme")
          ) {
            return;
          }
          play(defaultSound);
          break;
      }
    };
    element.addEventListener(event, playSectionSound);
  });
};

export default setupSound;
