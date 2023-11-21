import Particle from "./Particle.js";
import Effect from "./Effect.js";

window.addEventListener("load", () => {
  const canvas = document.getElementById("about__subtitle");
  const ctx = canvas.getContext("2d", {
    willReadFrequently: true,
  });
  const TEXT = "Frontend Developer";
  canvas.width = 220;
  canvas.height = 120;
  const effect = new Effect(ctx, canvas.width, canvas.height, Particle);
  let timeoutId;
  let isAnimating = true;

  const animate = () => {
    if (!isAnimating) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.render();
    requestAnimationFrame(animate);
  };

  const updateCanvasPosition = () => {
    const canvasRect = canvas.getBoundingClientRect();
    effect.canvasX = canvasRect.left;
    effect.canvasY = canvasRect.top;
  };

  const handleMouseMove = (e) => {
    const mouseX = e.clientX - effect.canvasX;
    const mouseY = e.clientY - effect.canvasY;
    effect.mouse.x = mouseX;
    effect.mouse.y = mouseY;
  };

  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("scroll", updateCanvasPosition);
  window.addEventListener("resize", updateCanvasPosition);
  canvas.addEventListener("mouseout", () => {
    timeoutId = setTimeout(() => {
      isAnimating = false;
    }, 2000);
  });

  canvas.addEventListener("mouseover", () => {
    clearTimeout(timeoutId);
    if (!isAnimating) {
      isAnimating = true;
      animate();
    }
  });

  effect.wrapText(TEXT);
  effect.render();
  updateCanvasPosition();
  animate();
});
