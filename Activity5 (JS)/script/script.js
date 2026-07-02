const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

for (let i = 0; i < 700; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    r: Math.random() * 2
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let p of particles) {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.fill();
  }

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("mousemove", (e) => {
  const mx = e.clientX;
  const my = e.clientY;

  for (let p of particles) {
    const dx = p.x - mx;
    const dy = p.y - my;
    const dist = Math.sqrt(dx*dx + dy*dy);

    if (dist < 120) {
      p.vx += dx * 0.0005;
      p.vy += dy * 0.0005;
    }
  }
});

function leftBt(id){
  const elem = document.getElementById(id);
  elem.scrollTo({
    left: elem.scrollLeft - 950,
    behavior: "smooth"
  });
}

function rightBt(id){
  const elem = document.getElementById(id);
  elem.scrollTo({
    left: elem.scrollLeft + 950,
    behavior: "smooth"
  });
}

