class Effect {
  constructor(context, canvasWidth, canvasHeight, Particle) {
    this.Particle = Particle;
    this.context = context;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.textX = this.canvasWidth / 2;
    this.textY = this.canvasHeight / 2;
    this.fontSize = 60;
    this.lineHeight = this.fontSize * 1.1;
    this.MAX_TEXT_WIDTH = canvas.width * 0.8;
    this.verticalOffset = -70;
    this.Particles = [];
    this.gap = 3;
    this.mouse = {
      radius: 2200,
      x: 0,
      y: 0,
    };

    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    });
  }

  wrapText(text) {
    // 컨텐츠 영역 정의
    const gradient = this.context.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    );
    // 영역 %, 색 정의
    gradient.addColorStop(0.3, "blue");
    gradient.addColorStop(0.5, "fuchsia");
    gradient.addColorStop(0.7, "purple");
    // style 정의
    this.context.fillStyle = gradient;
    this.context.textAlign = "center";
    this.context.lineWidth = 3;
    this.context.strokeStyle = "white";
    this.context.letterSpacing = "5px";
    this.context.textBaseline = "middle";
    this.context.font = `${this.fontSize}px Bangers`;

    // text 전처리, 띄어쓰기마다 분리.
    let lineArray = [];
    let lineCounter = 0;

    // 글자들 painting
    const paintWords = (lineArray) => {
      lineArray.map((line, idx) => {
        this.context.fillText(
          line,
          this.textX,
          this.textY + idx * this.lineHeight
        );
        this.context.strokeText(
          line,
          this.textX,
          this.textY + idx * this.lineHeight
        );
      });
    };

    let textHeight = this.lineHeight * lineCounter;
    this.textY = this.canvasHeight / 2 - textHeight / 2 + this.verticalOffset;

    paintWords(lineArray);

    this.convertToParticles();
  }

  // 파티클로 변환
  convertToParticles() {
    this.particles = [];
    // 각 픽셀들에 대한 정보.
    const pixels = this.context.getImageData(
      0,
      0,
      this.canvasWidth,
      this.canvasHeight
    ).data;
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    for (let y = 0; y < this.canvasHeight; y += this.gap) {
      for (let x = 0; x < this.canvasWidth; x += this.gap) {
        const index = (y * this.canvasWidth + x) * 4;
        const alpha = pixels[index + 3];
        if (alpha > 0) {
          const red = pixels[index];
          const green = pixels[index + 1];
          const blue = pixels[index + 2];
          const color = `rgb(${red}, ${green}, ${blue})`;
          this.particles.push(new this.Particle(this, x, y, color));
        }
      }
    }
  }

  render() {
    this.particles.map((particle) => {
      particle.update();
      particle.draw();
    });
  }
}

export default Effect;
