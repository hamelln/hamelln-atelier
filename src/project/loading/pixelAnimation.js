import Particle from "./Particle.js";
import Effect from "./Effect.js";

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 800;
  canvas.height = 600;

  const effect = new Effect(ctx, canvas.width, canvas.height, Particle);

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.render();
    requestAnimationFrame(animate);
  };

  effect.wrapText(TEXT);
  effect.render();
  animate();
});
