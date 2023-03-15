class Particle {
  constructor(ctx, WIDTH, HEIGHT) {
    this.ctx = ctx;
    this.WIDTH = WIDTH;
    this.HEIGHT = HEIGHT;
    this.fullAngle = Math.PI * 2;
    this.x = Math.random() * this.WIDTH;
    this.y = Math.random() * this.HEIGHT;
    this.r = 5;
    this.speed = 1;
    this.direction = this.x > 63 ? 1 : -1;
    this.px = Math.floor(this.x);
    this.py = Math.floor(this.y);
  }

  update(phaseSign) {
    this.speed = this.speed <= 0.1 ? 0.1 : this.speed - 0.004;
    this.x += this.direction * this.speed;
    this.r = this.r <= 1 ? 1 : this.r - 0.04;

    if (this.x <= 0 || this.x > this.WIDTH) {
      this.x = Math.random() * this.WIDTH;
      this.y = Math.random() * this.HEIGHT;
      this.direction *= -1;
      if (this.speed < 0.2 && phaseSign > 0) {
        this.y = this.HEIGHT / 2 + this.y / 2;
        this.r = 2;
      }
    }
    this.px = Math.floor(this.x);
    this.py = Math.floor(this.y);
  }

  draw(phase) {
    this.ctx.beginPath();
    this.ctx.fillStyle = phase[this.py][this.px];
    this.ctx.arc(this.x, this.y, this.r, 0, this.fullAngle);
    this.ctx.fill();
  }
}

export default Particle;
