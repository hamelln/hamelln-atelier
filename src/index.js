import themeButtonSetup from "./themeButton/index.js";
import setupHeaderScrollBehavior from "./setupHeaderScrollBehavior.js";
import addKeyboardNavigationWithScroll from "./addKeyboardNavigationWithScroll.js";

window.addEventListener("load", () => {
  themeButtonSetup();
  setupHeaderScrollBehavior();
  addKeyboardNavigationWithScroll();
  const op = document.querySelector(".opening");
  setTimeout(() => op.remove(), 6000);
});
