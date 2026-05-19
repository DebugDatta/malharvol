let currentScene = 'gloom';

const rejectionComments = [
  "Thank you for your interest in joining the Malhar 2026 Computers Department as a volunteer. We received an exceptionally high volume of applications this year, and after a thorough review of all profiles, <span class=\"regret-highlight\">we regret to inform</span> you that we are unable to offer you a position at this time. We sincerely appreciate your time, effort, and interest in Malhar, and we wish you the very best in your future endeavors."
];

const acceptanceQuotes = [
  "Welcome to the chaos! Prepare your terminals, fuel up on caffeine, and see you behind the scenes!",
  "Access granted! Welcome to the Malhar 2026 Computers Department!",
  "The system has chosen you! Get ready for an epic journey!"
];

const customCursor = document.getElementById('customCursor');
const rejectionLetter = document.getElementById('rejectionLetter');
const rejectionBodyText = document.getElementById('rejectionBodyText');
const portalGloop = document.getElementById('portalGloop');
const portalContainer = document.getElementById('portalContainer');
const eyeLeft = document.getElementById('eyeLeft');
const eyeRight = document.getElementById('eyeRight');
const pupilLeft = document.getElementById('pupilLeft');
const pupilRight = document.getElementById('pupilRight');
const dragInstructions = document.getElementById('dragInstructions');
const sceneGloom = document.getElementById('sceneGloom');
const sceneAcceptance = document.getElementById('sceneAcceptance');
const goldenTicket = document.getElementById('goldenTicket');

if (rejectionBodyText) {
  rejectionBodyText.innerHTML = rejectionComments[0];
}


let lastMouseX = 0;
let lastMouseY = 0;
let mouseSpeedX = 0;
let mouseIsDown = false;

window.addEventListener('mousemove', (e) => {
  customCursor.style.left = `${e.clientX}px`;
  customCursor.style.top = `${e.clientY}px`;

  mouseSpeedX = e.clientX - lastMouseX;
  const targetRotation = Math.max(-30, Math.min(30, mouseSpeedX * 0.8));
  document.documentElement.style.setProperty('--cursor-rotate', `${targetRotation}deg`);

  lastMouseX = e.clientX;
  lastMouseY = e.clientY;

  if (currentScene === 'gloom') {
    trackEyes(e.clientX, e.clientY);
  }

  if (Math.abs(mouseSpeedX) > 5 && Math.random() < 0.25) {
    createMouseParticle(e.clientX, e.clientY);
  }
});

window.addEventListener('mousedown', () => {
  mouseIsDown = true;
  customCursor.classList.add('active');
});

window.addEventListener('mouseup', () => {
  mouseIsDown = false;
  customCursor.classList.remove('active');
});

function createMouseParticle(x, y) {
  const colors = ['var(--primary-neon-pink)', 'var(--accent-cyan)', 'var(--accent-orange)'];
  particles.push(new CartoonParticle(
    x, y,
    (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2,
    Math.random() * 6 + 4,
    colors[Math.floor(Math.random() * colors.length)],
    'circle',
    0.3
  ));
}

const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class CartoonParticle {
  constructor(x, y, vx, vy, size, color, shape = 'circle', alphaDecay = 0.01) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.size = size;
    this.color = color;
    this.shape = shape;
    this.alpha = 1;
    this.alphaDecay = alphaDecay;
    this.angle = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.angle += this.rotSpeed;

    if (this.shape === 'rain') {
      this.vy += 0.2;
    } else if (this.shape === 'star' || this.shape === 'square') {
      this.vy += 0.05;
      this.vx *= 0.99;
    }

    this.alpha -= this.alphaDecay;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = this.color;
    ctx.strokeStyle = '#0b011c';
    ctx.lineWidth = 3;

    if (this.shape === 'circle') {
      ctx.beginPath();
      ctx.arc(0, 0, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else if (this.shape === 'rain') {
      ctx.strokeStyle = 'rgba(111, 36, 187, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -this.size * 2);
      ctx.lineTo(0, this.size * 2);
      ctx.stroke();
    } else if (this.shape === 'square') {
      ctx.beginPath();
      ctx.rect(-this.size, -this.size, this.size * 2, this.size * 2);
      ctx.fill();
      ctx.stroke();
    } else if (this.shape === 'star') {
      ctx.beginPath();
      const spikes = 5;
      const outerRadius = this.size;
      const innerRadius = this.size / 2;
      let rot = Math.PI / 2 * 3;
      let step = Math.PI / spikes;

      for (let i = 0; i < spikes; i++) {
        let px = Math.cos(rot) * outerRadius;
        let py = Math.sin(rot) * outerRadius;
        ctx.lineTo(px, py);
        rot += step;

        px = Math.cos(rot) * innerRadius;
        py = Math.sin(rot) * innerRadius;
        ctx.lineTo(px, py);
        rot += step;
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    ctx.restore();
  }
}

function triggerBurst(x, y, count = 50) {
  const shapes = ['star', 'square', 'circle'];
  const colors = ['#f95aff', '#ff00cf', '#ff6b00', '#00abff', '#39ff14', '#e8cbcf'];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 12 + 4;
    particles.push(new CartoonParticle(
      x, y,
      Math.cos(angle) * speed,
      Math.sin(angle) * speed - (Math.random() * 4),
      Math.random() * 12 + 6,
      colors[Math.floor(Math.random() * colors.length)],
      shapes[Math.floor(Math.random() * shapes.length)],
      Math.random() * 0.015 + 0.005
    ));
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (currentScene === 'gloom' && Math.random() < 0.18) {
    const rx = Math.random() * canvas.width;
    particles.push(new CartoonParticle(
      rx, -10,
      1, Math.random() * 8 + 6,
      Math.random() * 6 + 3,
      '#6f24bb',
      'rain',
      0.008
    ));
  } else if (currentScene === 'acceptance' && Math.random() < 0.12) {
    particles.push(new CartoonParticle(
      Math.random() * canvas.width,
      canvas.height + 10,
      (Math.random() - 0.5) * 2,
      -Math.random() * 3 - 1,
      Math.random() * 10 + 6,
      'rgba(249, 90, 255, 0.4)',
      'star',
      0.006
    ));
  }

  particles = particles.filter(p => {
    p.update();
    p.draw();
    return p.alpha > 0;
  });

  requestAnimationFrame(animateParticles);
}
requestAnimationFrame(animateParticles);

let letterX = 0;
let letterY = 0;
let targetX = 0;
let targetY = 0;
let vx = 0;
let vy = 0;
const k = 0.18;
const damping = 0.76;

let dragStartX = 0;
let dragStartY = 0;
let isDragging = false;
let isMagnetized = false;

function solveSpringPhysics() {
  if (isDragging || isMagnetized) return;

  const dx = targetX - letterX;
  const dy = targetY - letterY;

  const ax = dx * k;
  const ay = dy * k;

  vx = (vx + ax) * damping;
  vy = (vy + ay) * damping;

  letterX += vx;
  letterY += vy;

  const speed = Math.sqrt(vx * vx + vy * vy);
  const scaleX = 1 + (speed * 0.008);
  const scaleY = 1 - (speed * 0.005);
  const tilt = vx * 0.8;

  rejectionLetter.style.transform = `translate3d(${letterX}px, ${letterY}px, 0) scale(${scaleX}, ${scaleY}) rotate(${tilt}deg)`;

  if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1 || speed > 0.1) {
    requestAnimationFrame(solveSpringPhysics);
  } else {
    letterX = 0;
    letterY = 0;
    rejectionLetter.style.transform = `translate3d(0, 0, 0) rotate(-1deg)`;
  }
}

rejectionLetter.addEventListener('mousedown', startDrag);
rejectionLetter.addEventListener('touchstart', startDrag, { passive: false });

function startDrag(e) {
  if (currentScene !== 'gloom' || isMagnetized) return;

  isDragging = true;

  const clientX = e.clientX || e.touches[0].clientX;
  const clientY = e.clientY || e.touches[0].clientY;

  dragStartX = clientX - letterX;
  dragStartY = clientY - letterY;

  rejectionLetter.style.transition = 'none';

  window.addEventListener('mousemove', dragMove);
  window.addEventListener('touchmove', dragMove, { passive: false });
  window.addEventListener('mouseup', endDrag);
  window.addEventListener('touchend', endDrag);
}

function dragMove(e) {
  if (!isDragging) return;
  if (e.cancelable) e.preventDefault();

  const clientX = e.clientX || e.touches[0].clientX;
  const clientY = e.clientY || e.touches[0].clientY;

  letterX = clientX - dragStartX;
  letterY = clientY - dragStartY;

  const speedX = clientX - lastMouseX;
  const dragStretch = Math.min(1.2, 1 + Math.abs(speedX) * 0.005);
  const dragSquash = Math.max(0.8, 1 - Math.abs(speedX) * 0.003);
  rejectionLetter.style.transform = `translate3d(${letterX}px, ${letterY}px, 0) scale(${dragStretch}, ${dragSquash}) rotate(${speedX * 0.5}deg)`;

  const letterRect = rejectionLetter.getBoundingClientRect();
  const portalRect = portalContainer.getBoundingClientRect();

  const letterCenterX = letterRect.left + letterRect.width / 2;
  const letterCenterY = letterRect.top + letterRect.height / 2;

  const pCenterX = portalRect.left + portalRect.width / 2;
  const pCenterY = portalRect.top + portalRect.height / 2;

  const dist = Math.hypot(letterCenterX - pCenterX, letterCenterY - pCenterY);

  const magnetRange = portalRect.width * 1.0;
  const swallowRange = portalRect.width * 0.7;

  if (dist < magnetRange) {
    portalGloop.classList.add('mouth-open');
    if (dist < swallowRange) {
      isMagnetized = true;
      isDragging = false;
      window.removeEventListener('mousemove', dragMove);
      window.removeEventListener('touchmove', dragMove);
      window.removeEventListener('mouseup', endDrag);
      window.removeEventListener('touchend', endDrag);

      triggerMagnetizedSwallow(letterCenterX, letterCenterY, pCenterX, pCenterY);
    }
  } else {
    portalGloop.classList.remove('mouth-open');
  }
}

function endDrag() {
  if (!isDragging) return;
  isDragging = false;

  window.removeEventListener('mousemove', dragMove);
  window.removeEventListener('touchmove', dragMove);
  window.removeEventListener('mouseup', endDrag);
  window.removeEventListener('touchend', endDrag);

  portalGloop.classList.remove('mouth-open');

  solveSpringPhysics();
}

function triggerMagnetizedSwallow(lCenterX, lCenterY, pCenterX, pCenterY) {
  dragInstructions.style.opacity = '0';
  const hintBubble = document.getElementById('hintBubble');
  if (hintBubble) hintBubble.style.opacity = '0';

  let animFrame = 0;
  const startX = letterX;
  const startY = letterY;

  const targetOffsetX = startX + (pCenterX - lCenterX);
  const targetOffsetY = startY + (pCenterY - lCenterY);

  function animateSwallow() {
    animFrame += 1;
    const progress = animFrame / 24;

    if (progress >= 1) {
      rejectionLetter.style.display = 'none';
      portalGloop.classList.remove('mouth-open');
      launchTransformation(pCenterX, pCenterY);
      return;
    }

    const t = progress;
    letterX = startX + (targetOffsetX - startX) * t;
    letterY = startY + (targetOffsetY - startY) * t;

    const scale = 1 - t;
    const angle = t * 720;

    rejectionLetter.style.transform = `translate3d(${letterX}px, ${letterY}px, 0) scale(${scale}) rotate(${angle}deg)`;

    const currentLetterCenterX = lCenterX + (pCenterX - lCenterX) * t;
    const currentLetterCenterY = lCenterY + (pCenterY - lCenterY) * t;
    trackEyes(currentLetterCenterX, currentLetterCenterY);

    requestAnimationFrame(animateSwallow);
  }
  requestAnimationFrame(animateSwallow);
}

function trackEyes(targetX, targetY) {
  const eyes = [
    { eye: eyeLeft, pupil: pupilLeft },
    { eye: eyeRight, pupil: pupilRight }
  ];

  eyes.forEach(({ eye, pupil }) => {
    if (!eye || !pupil) return;
    const rect = eye.getBoundingClientRect();
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;

    const angle = Math.atan2(targetY - eyeCenterY, targetX - eyeCenterX);

    const maxOffset = rect.width * 0.22;
    const pupilX = Math.cos(angle) * maxOffset;
    const pupilY = Math.sin(angle) * maxOffset;

    pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
  });
}

function launchTransformation(burstX, burstY) {
  currentScene = 'transition';

  const comicContainer = document.querySelector('.comic-frame-container');
  comicContainer.classList.add('wobble-animate');

  comicContainer.style.transform = 'scale(1.04)';

  setTimeout(() => {
    const flash = document.createElement('div');
    flash.classList.add('screen-flash', 'flash-active');
    document.body.appendChild(flash);

    triggerBurst(burstX, burstY, 150);

    setTimeout(() => {
      sceneGloom.classList.remove('scene-active');
      sceneAcceptance.classList.add('scene-active');
      comicContainer.classList.remove('wobble-animate');
      comicContainer.style.transform = 'scale(1)';
      comicContainer.style.background = 'radial-gradient(circle at center, #2e0854 0%, var(--bg-dark-abyss) 100%)';

      currentScene = 'acceptance';

      setTimeout(() => flash.remove(), 1000);

      const acceptanceQuote = document.getElementById('acceptanceQuote');
      if (acceptanceQuote) {
        acceptanceQuote.innerHTML = acceptanceQuotes[Math.floor(Math.random() * acceptanceQuotes.length)];
      }
    }, 150);
  }, 600);
}

goldenTicket.addEventListener('click', (e) => {
  goldenTicket.classList.toggle('flipped');

  const rect = goldenTicket.getBoundingClientRect();
  triggerBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 20);
});
