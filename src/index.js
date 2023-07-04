import themeButtonSetup from "./themeButton/index.js";
import headerSetup from "./header.js";

window.addEventListener("load", () => {
  themeButtonSetup();
  headerSetup();
  const op = document.querySelector(".opening");
  setTimeout(() => op.remove(), 6000);
});
