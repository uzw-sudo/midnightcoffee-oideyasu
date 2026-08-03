"use strict";

(() => {
  const canvas = document.getElementById("nightSky");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const stars = [];

  let width = 0;
  let height = 0;
  let dpr = 1;
  let rafId = 0;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    stars.length = 0;

    const count = Math.max(
      75,
      Math.round((width * height) / 8500)
    );

    for (let index = 0; index < count; index += 1) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.25 + .2,
        alpha: Math.random() * .6 + .15,
        speed: Math.random() * .0011 + .00028,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  function draw(time = 0) {
    ctx.clearRect(0, 0, width, height);

    for (const star of stars) {
      const alpha =
        star.alpha +
        Math.sin(time * star.speed + star.phase) * .16;

      ctx.beginPath();
      ctx.fillStyle =
        `rgba(244, 239, 214, ${Math.max(.07, alpha)})`;

      ctx.arc(
        star.x,
        star.y,
        star.radius,
        0,
        Math.PI * 2
      );

      ctx.fill();
    }

    rafId = requestAnimationFrame(draw);
  }

  window.addEventListener(
    "resize",
    resize,
    { passive: true }
  );

  document.addEventListener(
    "visibilitychange",
    () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        rafId = requestAnimationFrame(draw);
      }
    }
  );

  resize();
  rafId = requestAnimationFrame(draw);
})();
