// Firefly Events — ambient background canvas
// A quieter variant of js/app.js: fewer fireflies, slower drift, dimmer glow,
// meant to read as calm atmosphere rather than a busy swarm.

const canvas = document.getElementById('fireflyCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Firefly {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.25;
    this.speedY = (Math.random() - 0.5) * 0.25;
    this.opacity = 0;
    this.maxOpacity = 0.3 + Math.random() * 0.25;
    this.fadeSpeed = Math.random() * 0.006 + 0.003;
    this.fadingIn = true;
    this.glowSize = Math.random() * 9 + 6;

    const colors = ['255, 215, 0', '255, 190, 0', '255, 205, 110'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    this.speedX += (Math.random() - 0.5) * 0.015;
    this.speedY += (Math.random() - 0.5) * 0.015;
    this.speedX = Math.max(-0.35, Math.min(0.35, this.speedX));
    this.speedY = Math.max(-0.35, Math.min(0.35, this.speedY));

    if (this.fadingIn) {
      this.opacity += this.fadeSpeed;
      if (this.opacity >= this.maxOpacity) this.fadingIn = false;
    } else {
      this.opacity -= this.fadeSpeed;
      if (this.opacity <= 0) this.reset();
    }

    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;
  }

  draw() {
    ctx.save();

    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.glowSize
    );
    gradient.addColorStop(0, `rgba(${this.color}, ${this.opacity})`);
    gradient.addColorStop(1, `rgba(${this.color}, 0)`);

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.glowSize, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

const fireflies = Array.from({ length: 18 }, () => new Firefly());

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const fly of fireflies) {
    fly.update();
    fly.draw();
  }
  requestAnimationFrame(animate);
}
animate();
