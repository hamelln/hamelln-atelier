import themeButtonSetup from "./themeButton/index.js";

window.addEventListener("load", () => {
  themeButtonSetup();
  const op = document.querySelector(".opening");
  setTimeout(() => op.remove(), 6000);
});
