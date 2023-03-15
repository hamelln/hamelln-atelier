import Particle from "./Particle.js";

window.addEventListener("load", () => {
  const canvas = document.querySelector(".mode__canvas");
  const button = document.querySelector(".mode__button");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  canvas.width = 140;
  canvas.height = 80;
  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;

  const init = () => {
    return Array.from(
      { length: WIDTH },
      () => new Particle(ctx, WIDTH, HEIGHT)
    );
  };

  const drawImg = (img) => {
    ctx.drawImage(img, 0, 0, WIDTH, HEIGHT);
  };

  const getRgbsFromImageData = (img) => {
    const colorMap = [];
    for (let y = 0; y < HEIGHT; y++) {
      const row = [];
      for (let x = 0; x < WIDTH; x++) {
        const r = img.data[y * 4 * img.width + x * 4];
        const g = img.data[y * 4 * img.width + x * 4 + 1];
        const b = img.data[y * 4 * img.width + x * 4 + 2];
        const color = `rgb(${r},${g},${b})`;
        row.push(color);
      }
      colorMap.push(row);
    }
    return colorMap;
  };

  const setup = () => {
    const night = document.getElementById("night");
    drawImg(night);
    const nightData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
    const nightGrid = getRgbsFromImageData(nightData);

    const morning = document.getElementById("morning");
    drawImg(morning);
    const morningData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
    const morningGrid = getRgbsFromImageData(morningData);

    const phaseMap = new Map();
    phaseMap.set(1, [morning, nightGrid]);
    phaseMap.set(-1, [night, morningGrid]);
    return phaseMap;
  };

  const handleClick = () => {
    reset();
    setPhase(-phaseSign);
  };

  const setPhase = (newPhaseSign) => {
    phaseSign = newPhaseSign;
    phase = phaseMap.get(phaseSign)[1];
    particles = init();
    play();
  };

  const reset = () => {
    onAnimate = false;
    particles = [];
    const img = phaseMap.get(-phaseSign)[0];
    drawImg(img);
  };

  const play = () => {
    setTimeout(() => {
      onAnimate = true;
      animate();
    }, 60);
  };

  const animate = () => {
    if (!onAnimate) return;
    particles.map(setParticle);
    requestAnimationFrame(animate);
  };

  const setParticle = (particle) => {
    particle.update(phaseSign);
    particle.draw(phase);
  };

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
