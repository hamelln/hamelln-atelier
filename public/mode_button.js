import Button from "../src/js/modeButton/Button.js";

(() => {
  const buttonElement = document.querySelector(".mode__button");
  const button = new Button(buttonElement);

  buttonElement.addEventListener("mouseenter", button.display);
  buttonElement.addEventListener("mouseleave", button.hide);
  buttonElement.addEventListener("click", button.click);
})();
