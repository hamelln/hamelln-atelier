class Effect {
  constructor(context, canvasWidth, canvasHeight, Particle) {
    this.Particle = Particle;
    this.context = context;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.textX = this.canvasWidth / 2;
    this.textY = this.canvasHeight / 2;
    this.fontSize = 36;
    this.lineHeight = this.fontSize * 1.1;
    this.MAX_TEXT_WIDTH = canvasWidth * 0.8;
    this.verticalOffset = 0;
    this.Particles = [];
    this.gap = 1;
    this.mouse = {
      radius: 2200,
      x: 0,
      y: 0,
    };
  }

  wrapText(text) {
    const gradient = this.context.createLinearGradient(
      0,
      0,
      this.canvasWidth,
      this.canvasHeight
    );
    gradient.addColorStop(0.3, "#63294B");
    gradient.addColorStop(0.7, "#f8f8f8");
    this.context.fillStyle = gradient;
    this.context.textAlign = "center";
    this.context.lineWidth = 1;
    this.context.strokeStyle = "#efefef";
    this.context.letterSpacing = "3px";
    this.context.textBaseline = "middle";
    this.context.font = `${this.fontSize}px PFStardust`;

    let lineArray = ["Frontend", "Developer"];
    let lineCounter = 1;

    const paintWords = (lineArray) => {
      lineArray.map((line, idx) => {
        this.context.fillText(
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

  convertToParticles() {
    this.particles = [];
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
          const color = `rgba(${red}, ${green}, ${blue}, 0.6)`;
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

  resize(width, height) {
    canvas.width = width;
    canvas.height = height;
    this.textX = this.canvasWidth / 2;
    this.textY = this.canvasHeight / 2;
    this.MAX_TEXT_WIDTH = canvas.width * 0.8;
  }
}

export default Effect;
