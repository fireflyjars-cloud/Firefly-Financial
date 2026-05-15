// Firefly Financial — Firefly Animation
// Mythical night forest with glowing fireflies

const canvas = document.getElementById('fireflyCanvas');
const ctx = canvas.getContext('2d');

// ── Canvas Size ──
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// ── Firefly Class ──
class Firefly {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 0.8;
    this.speedY = (Math.random() - 0.5) * 0.8;
    this.opacity = Math.random();
    this.fadeSpeed = Math.random() * 0.02 + 0.005;
    this.fadingIn = Math.random() > 0.5;
    this.glowSize = Math.random() * 15 + 8;

    // Gold and amber colors like the image
    const colors = [
      '255, 215, 0',   // gold
      '255, 180, 0',   // amber gold
      '255, 140, 0',   // amber
      '255, 200, 100', // warm yellow
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Gentle drift
    this.speedX += (Math.random() - 0.5) * 0.05;
    this.speedY += (Math.random() - 0.5) * 0.05;

    // Keep speed gentle
    this.speedX = Math.max(-1, Math.min(1, this.speedX));
    this.speedY = Math.max(-1, Math.min(1, this.speedY));

    // Fade in and out
    if (this.fadingIn) {
      this.opacity += this.fadeSpeed;
      if (this.opacity >= 1) this.fadingIn = false;
    } else {
      this.opacity -= this.fadeSpeed;
      if (this.opacity <= 0) this.reset();
    }

    // Wrap around edges
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;
  }

  draw() {
    ctx.save();

    // Outer glow
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.glowSize
    );​​​​​​​​​​​​​​​​
