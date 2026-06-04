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

    const colors = [
      '255, 215, 0',
      '255, 180, 0',
      '255, 140, 0',
      '255, 200, 100',
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    this.speedX += (Math.random() - 0.5) * 0.05;
    this.speedY += (Math.random() - 0.5) * 0.05;
    this.speedX = Math.max(-1, Math.min(1, this.speedX));
    this.speedY = Math.max(-1, Math.min(1, this.speedY));

    if (this.fadingIn) {
      this.opacity += this.fadeSpeed;
      if (this.opacity >= 1) this.fadingIn = false;
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

// ── Canvas Fireflies (background — scrolls beneath page content) ──
const fireflies = Array.from({ length: 60 }, () => new Firefly());

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const fly of fireflies) {
    fly.update();
    fly.draw();
  }
  requestAnimationFrame(animate);
}
animate();

// ── Jar Modals ──
(function () {
  function closeAll() {
    document.querySelectorAll('.modal-overlay.open').forEach(o => {
      o.classList.remove('open');
    });
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-modal]').forEach(card => {
    const modal = document.getElementById(card.dataset.modal + 'Modal');
    if (!modal) return;

    function openModal() {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    card.addEventListener('click', openModal);
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') openModal(); });
    modal.querySelector('.modal-close').addEventListener('click', closeAll);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeAll(); });
  });

  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll(); });
})();

// ── Hero Fireflies (DOM-based, visible over the hero image) ──
// ── Hero Fireflies (DOM-based, visible over the hero image) ──
(function () {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const anchor = hero.querySelector('.hero-content');
  const COLORS = ['255,215,0', '255,190,0', '255,165,0', '255,200,80', '255,255,150'];
  const dots = [];

   for (let i = 0; i < 1000; i++) {
    const dot     = document.createElement('span');
    dot.className = 'hero-ff';

    // Start from edges of the screen
    const edge = Math.floor(Math.random() * 4);
    let startX, startY;
    if (edge === 0) { startX = Math.random() * 100; startY = -2; }
    else if (edge === 1) { startX = 102; startY = Math.random() * 100; }
    else if (edge === 2) { startX = Math.random() * 100; startY = 102; }
    else { startX = -2; startY = Math.random() * 100; }

    const driftDur = 6  + Math.random() * 10;
    const blinkDur = 1.5 + Math.random() * 3;

    dot.style.cssText = [
      `left:${startX}%`,
      `top:${startY}%`,
      `width:${2 + Math.random() * 3.5}px`,
      `height:${2 + Math.random() * 3.5}px`,
      `--ff-color:${COLORS[Math.floor(Math.random() * COLORS.length)]}`,
      `animation-duration:${driftDur}s,${blinkDur}s`,
      `animation-delay:${-(Math.random() * driftDur)}s,${-(Math.random() * blinkDur)}s`,
    ].join(';');

    hero.insertBefore(dot, anchor);
    dots.push(dot);
  }

  // After 3 seconds, swarm into the button rectangle
  setTimeout(() => {
    const btn = hero.querySelector('.hero-cta');
    if (!btn) return;
    const heroRect = hero.getBoundingClientRect();
    const btnRect  = btn.getBoundingClientRect();

    const btnLeft   = btnRect.left   - heroRect.left;
    const btnTop    = btnRect.top    - heroRect.top;
    const btnRight  = btnRect.right  - heroRect.left;
    const btnBottom = btnRect.bottom - heroRect.top;

    dots.forEach((dot, i) => {
      setTimeout(() => {
        // Land at a random spot inside the button boundaries
        const targetX = btnLeft + Math.random() * (btnRight - btnLeft);
        const targetY = btnTop  + Math.random() * (btnBottom - btnTop);
        const dur     = 1.5 + Math.random() * 2;

        dot.style.transition = `left ${dur}s cubic-bezier(0.4,0,0.2,1), top ${dur}s cubic-bezier(0.4,0,0.2,1), opacity 0.6s ease-in ${dur - 0.4}s`;
        dot.style.left    = targetX + 'px';
        dot.style.top     = targetY + 'px';
        dot.style.opacity = '0';
      }, i * 8);
    });
  }, 3000);
})();


// ── Jar Glass Click Sound ──
const clickAudio = new window.Audio('https://assets.mixkit.co/active_storage/sfx/2073/2073-preview.mp3');
clickAudio.volume = 0.6;

document.querySelectorAll('.jar-card').forEach(card => {
  card.addEventListener('click', () => {
    clickAudio.currentTime = 0;
    clickAudio.play().catch(() => {});
  });
});
