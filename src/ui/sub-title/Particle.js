class Particle {
  constructor(effect, x, y, color) {
    this.effect = effect;
    this.x = effect.canvasWidth;
    this.y = effect.canvasHeight;
    this.color = color;
    this.originX = x;
    this.originY = y;
    this.size = 3;
    this.dx = 0;
    this.dy = 0;
    this.vx = 0;
    this.vy = 0;
    this.force = 0;
    this.angle = 0;
    this.distance = 0;
    this.friction = 0.9;
    this.ease = 0.2;
    this.opacity = 1;
  }

  draw() {
    this.effect.context.fillStyle = this.color;
    this.effect.context.fillRect(this.x, this.y, this.size, this.size);
    this.effect.context.globalAlpha = this.opacity;
  }

  update() {
    this.dx = this.effect.mouse.x - this.x;
    this.dy = this.effect.mouse.y - this.y;
    this.distance = this.dx * this.dx + this.dy * this.dy;
    this.force = -this.effect.mouse.radius / this.distance;
    this.opacity = 1;

    if (this.distance < this.effect.mouse.radius) {
      this.angle = Math.tanh(this.dy, this.dx);
      this.vx += this.force * Math.cos(this.angle);
      this.vy += this.force * Math.sin(this.angle);
      this.opacity = 0.2;
    }

    this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
    this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
  }
}

export default Particle;
