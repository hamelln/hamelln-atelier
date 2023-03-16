import { handleAnimation, stopAnimation } from "./animation.js";
import handleSoundSign from "./sound.js";
import { displayCanvas, foldCanvas, handleThemeSign } from "./style.js";

const themeButtonSetup = () => {
  const handleClick = () => {
    handleAnimation();
    handleThemeSign();
    handleSoundSign();
  };

  const clearCanvas = () => {
    setTimeout(stopAnimation, 300);
    foldCanvas();
  };

  const button = document.querySelector(".mode__button");
  button.addEventListener("click", handleClick);
  button.addEventListener("mouseenter", displayCanvas);
  button.addEventListener("mouseleave", clearCanvas);
};

export default themeButtonSetup;
