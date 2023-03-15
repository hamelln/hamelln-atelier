import Particle from "./Particle.js";

window.addEventListener("load", () => {
  const canvas = document.querySelector(".mode__canvas");
  const button = document.querySelector(".mode__button");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  canvas.width = 140;
  canvas.height = 80;
  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;

  const phaseMap = setup();
  let onAnimate = false;
  let particles;
  let phaseSign = -1;
  let phase = phaseMap.get(phaseSign)[1];
  particles = init();
  button.addEventListener("click", handleClick);
  button.addEventListener("mouseleave", () => {
    setTimeout(reset, 300);
  });
});
