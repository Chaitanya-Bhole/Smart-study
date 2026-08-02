import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  hue: number;
  life: number;
};

// Clean HTML5 Canvas star-particle effect that follows the cursor.
// Self-contained, no external libs. Degrades gracefully if canvas unsupported.
export default function StarCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let dpr = window.devicePixelRatio || 1;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const particles: Particle[] = [];
    const maxParticles = 90;
    const mouse = { x: width / 2, y: height / 2, active: false };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
      // spawn a few particles per move
      for (let i = 0; i < 2; i++) {
        if (particles.length < maxParticles) {
          particles.push(createParticle(mouse.x, mouse.y));
        }
      }
    };
    const onLeave = () => {
      mouse.active = false;
    };

    function createParticle(x: number, y: number): Particle {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.8 + 0.2;
      return {
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 10,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.3,
        size: Math.random() * 2.5 + 1,
        alpha: 1,
        hue: Math.random() > 0.6 ? 0 : 350, // red-ish or white
        life: 1,
      };
    }

    // ambient drifting stars
    const ambient: Particle[] = [];
    for (let i = 0; i < 40; i++) {
      ambient.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.2,
        hue: 0,
        life: 1,
      });
    }

    let raf = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // ambient stars twinkle
      for (const p of ambient) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        const tw = 0.5 + Math.sin(Date.now() / 800 + p.x) * 0.3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * tw * 0.4})`;
        ctx.fill();
      }

      // cursor particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.01; // slight gravity
        p.life -= 0.012;
        p.alpha = Math.max(0, p.life);

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const radius = p.size * p.life;
        // glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 4);
        if (p.hue === 0) {
          grad.addColorStop(0, `rgba(229, 9, 20, ${p.alpha * 0.8})`);
          grad.addColorStop(0.4, `rgba(229, 9, 20, ${p.alpha * 0.25})`);
          grad.addColorStop(1, 'rgba(229, 9, 20, 0)');
        } else {
          grad.addColorStop(0, `rgba(255, 255, 255, ${p.alpha * 0.9})`);
          grad.addColorStop(0.4, `rgba(255, 220, 220, ${p.alpha * 0.3})`);
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // core
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = p.hue === 0 ? `rgba(255, 80, 90, ${p.alpha})` : `rgba(255,255,255,${p.alpha})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(render);
    };
    render();

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseout', onLeave);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeave);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas id="star-canvas" ref={canvasRef} aria-hidden="true" />;
}
