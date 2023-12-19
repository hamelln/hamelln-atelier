import Particle from "./Particle.js";
import Effect from "./Effect.js";
import debounce from "../../utils/debounce.js";

const setupSubTitleAnimation = () => {
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

  const updateCanvasPosition = debounce(() => {
    const canvasRect = canvas.getBoundingClientRect();
    effect.canvasX = canvasRect.left;
    effect.canvasY = canvasRect.top;
  });

  // mouseoutOffset 매개변수는 mouseout 시 마우스 포인터를 완전히 분리시키기 위함
  const handleMouseMove = ({ clientX, clientY }, mouseoutOffset = 0) => {
    const mouseX = clientX - effect.canvasX - mouseoutOffset;
    const mouseY = clientY - effect.canvasY - mouseoutOffset;
    effect.mouse.x = mouseX;
    effect.mouse.y = mouseY;
  };

  window.addEventListener("scroll", updateCanvasPosition);
  window.addEventListener("resize", updateCanvasPosition);
  canvas.addEventListener("mousemove", handleMouseMove);
  canvas.addEventListener("mouseout", (e) => {
    handleMouseMove(e, 10000);
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

  setTimeout(() => {
    isAnimating = false;
  }, 1000);
  effect.wrapText(TEXT);
  effect.render();
  updateCanvasPosition();
  animate();
};

export default setupSubTitleAnimation;
