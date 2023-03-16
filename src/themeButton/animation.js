import Particle from "./Particle.js";

export const { handleAnimation, stopAnimation } = (() => {
  const setup = () => {
    const canvas = document.querySelector(".mode__canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    canvas.width = 140;
    canvas.height = 80;
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    const getRgbsFromImageData = (imageArray, WIDTH, HEIGHT) => {
      const colorMap = [];
      for (let y = 0; y < HEIGHT; y++) {
        const row = [];
        for (let x = 0; x < WIDTH; x++) {
          const r = imageArray.data[y * 4 * imageArray.width + x * 4];
          const g = imageArray.data[y * 4 * imageArray.width + x * 4 + 1];
          const b = imageArray.data[y * 4 * imageArray.width + x * 4 + 2];
          const color = `rgb(${r},${g},${b})`;
          row.push(color);
        }
        colorMap.push(row);
      }
      return colorMap;
    };

    const night = document.getElementById("night");
    const morning = document.getElementById("morning");

    ctx.drawImage(night, 0, 0, WIDTH, HEIGHT);
    const nightData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
    const nightGrid = getRgbsFromImageData(nightData, WIDTH, HEIGHT);

    ctx.drawImage(morning, 0, 0, WIDTH, HEIGHT);
    const morningData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
    const morningGrid = getRgbsFromImageData(morningData, WIDTH, HEIGHT);

    const phaseMap = new Map();
    phaseMap.set(1, [morning, nightGrid]);
    phaseMap.set(-1, [night, morningGrid]);
    return [ctx, WIDTH, HEIGHT, phaseMap];
  };

  const init = (ctx, WIDTH, HEIGHT) => {
    return Array.from(
      { length: WIDTH },
      () => new Particle(ctx, WIDTH, HEIGHT)
    );
  };

  const drawImg = (img) => {
    ctx.drawImage(img, 0, 0, WIDTH, HEIGHT);
  };

  const handleAnimation = () => {
    stopAnimation();
    setPhase(-phaseSign);
  };

  const setPhase = (newPhaseSign) => {
    phaseSign = newPhaseSign;
    phase = phaseMap.get(phaseSign)[1];
    particles = init(ctx, WIDTH, HEIGHT);
    play();
  };

  const stopAnimation = () => {
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

  const [ctx, WIDTH, HEIGHT, phaseMap] = setup();
  let phaseSign = -1;
  let phase = phaseMap.get(phaseSign)[1];
  let onAnimate = false;
  let particles = init(ctx, WIDTH, HEIGHT);

  return { handleAnimation, stopAnimation };
})();
