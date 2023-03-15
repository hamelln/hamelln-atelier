import { handleAnimation, stopAnimation } from "./animation.js";
import { handleSign, displayCanvas, foldCanvas } from "./style.js";

const themeButtonSetup = () => {
  const handleClick = () => {
    handleAnimation();
    handleSign();
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
