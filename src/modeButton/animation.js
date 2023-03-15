export const init = () => {
  return Array.from({ length: WIDTH }, () => new Particle(ctx, WIDTH, HEIGHT));
};

export const drawImg = (img) => {
  ctx.drawImage(img, 0, 0, WIDTH, HEIGHT);
};

export const getRgbsFromImageData = (imageArray, WIDTH, HEIGHT) => {
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

export const setup = () => {
  const night = document.getElementById("night");
  drawImg(night);
  const nightData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
  const nightGrid = getRgbsFromImageData(nightData, WIDTH, HEIGHT);

  const morning = document.getElementById("morning");
  drawImg(morning);
  const morningData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
  const morningGrid = getRgbsFromImageData(morningData);

  const phaseMap = new Map();
  phaseMap.set(1, [morning, nightGrid]);
  phaseMap.set(-1, [night, morningGrid]);
  return phaseMap;
};

export const handleClick = () => {
  reset();
  setPhase(-phaseSign);
};

export const setPhase = (newPhaseSign) => {
  phaseSign = newPhaseSign;
  phase = phaseMap.get(phaseSign)[1];
  particles = init();
  play();
};

export const reset = () => {
  onAnimate = false;
  particles = [];
  const img = phaseMap.get(-phaseSign)[0];
  drawImg(img);
};

export const play = () => {
  setTimeout(() => {
    onAnimate = true;
    animate();
  }, 60);
};

export const animate = () => {
  if (!onAnimate) return;
  particles.map(setParticle);
  requestAnimationFrame(animate);
};

export const setParticle = (particle) => {
  particle.update(phaseSign);
  particle.draw(phase);
};
