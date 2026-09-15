"use client";

import { useEffect, useRef } from "react";

const SVG_W = 1600;
const SVG_H = 900;
const SVG_HORIZON = 500;

interface Star {
  x: number;
  y: number;
  big: boolean;
  phase: number;
  speed: number;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  ttl: number;
}

export function SkyCanvas({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let horizon = 0;
    let stars: Star[] = [];
    let meteors: Meteor[] = [];
    let raf = 0;
    let last = 0;
    let nextMeteorAt = 1500;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas!.clientWidth;
      h = canvas!.clientHeight;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Mirror the SVG backdrop's xMidYMid slice so stars stop at its horizon.
      const scale = Math.max(w / SVG_W, h / SVG_H);
      horizon = SVG_HORIZON * scale - (SVG_H * scale - h) / 2;
      const count = Math.round((w * horizon) / 7000);
      stars = Array.from({ length: count }, (_, i) => ({
        x: ((i * 0.618033) % 1) * w,
        y: ((i * 0.381966 + 0.13) % 1) * horizon * 0.96,
        big: i % 7 === 0,
        phase: (i * 1.7) % (Math.PI * 2),
        speed: 0.6 + ((i * 0.37) % 1.4),
      }));
      draw(0, 0);
    }

    function spawnMeteor(t: number) {
      const speed = 0.55 + Math.random() * 0.35;
      meteors.push({
        x: w * (0.25 + Math.random() * 0.7),
        y: horizon * (0.05 + Math.random() * 0.3),
        vx: -speed,
        vy: speed * 0.45,
        age: 0,
        ttl: 600 + Math.random() * 400,
      });
      nextMeteorAt = t + 2200 + Math.random() * 3800;
    }

    function draw(t: number, dt: number) {
      ctx!.clearRect(0, 0, w, h);
      for (const s of stars) {
        const alpha = reduced ? 0.7 : 0.4 + 0.4 * Math.sin(t * 0.0012 * s.speed + s.phase);
        ctx!.globalAlpha = alpha;
        ctx!.fillStyle = "#e8ebff";
        const size = s.big ? 2 : 1;
        ctx!.fillRect(Math.round(s.x), Math.round(s.y), size, size);
      }
      ctx!.globalAlpha = 1;
      if (reduced) return;
      if (t > nextMeteorAt) spawnMeteor(t);
      meteors = meteors.filter((m) => m.age < m.ttl);
      for (const m of meteors) {
        m.age += dt;
        m.x += m.vx * dt;
        m.y += m.vy * dt;
        const fade = 1 - m.age / m.ttl;
        const tail = 90;
        const grad = ctx!.createLinearGradient(m.x, m.y, m.x - m.vx * tail, m.y - m.vy * tail);
        grad.addColorStop(0, `rgba(255,255,255,${0.95 * fade})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = 2;
        ctx!.beginPath();
        ctx!.moveTo(m.x, m.y);
        ctx!.lineTo(m.x - m.vx * tail, m.y - m.vy * tail);
        ctx!.stroke();
      }
    }

    function loop(t: number) {
      const dt = last ? Math.min(t - last, 50) : 16;
      last = t;
      draw(t, dt);
      raf = window.requestAnimationFrame(loop);
    }

    function start() {
      window.cancelAnimationFrame(raf);
      last = 0;
      if (!reduced && active && !document.hidden) raf = window.requestAnimationFrame(loop);
    }

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    start();
    document.addEventListener("visibilitychange", start);
    return () => {
      window.cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener("visibilitychange", start);
    };
  }, [active]);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
