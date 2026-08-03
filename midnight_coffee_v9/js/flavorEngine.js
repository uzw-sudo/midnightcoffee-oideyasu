"use strict";

(() => {
  const LABELS = [
    "香り",
    "コク",
    "甘み",
    "酸味",
    "余韻"
  ];

  function normalizeFlavor(card) {
    const source =
      card?.coffee?.flavor ??
      card?.flavor ??
      {};

    if (Array.isArray(source)) {
      return LABELS.map((_, index) =>
        Number(source[index]) || 0
      );
    }

    const keys = [
      "aroma",
      "body",
      "sweetness",
      "acidity",
      "aftertaste"
    ];

    const japaneseKeys = [
      "香り",
      "コク",
      "甘み",
      "酸味",
      "余韻"
    ];

    return keys.map((key, index) =>
      Number(
        source[key] ??
        source[japaneseKeys[index]] ??
        0
      )
    );
  }

  function renderFlavorChart(card) {
    const canvas = document.getElementById("flavorChart");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const dpr = Math.min(
      window.devicePixelRatio || 1,
      2
    );

    const width = canvas.clientWidth || 280;
    const height = canvas.clientHeight || 210;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const values = normalizeFlavor(card).map(value =>
      Math.max(0, Math.min(5, value))
    );

    const centerX = width / 2;
    const centerY = height / 2 + 3;
    const radius = Math.min(width, height) * .31;

    const angleStep = (Math.PI * 2) / LABELS.length;
    const startAngle = -Math.PI / 2;

    ctx.lineJoin = "round";

    for (let level = 1; level <= 5; level += 1) {
      ctx.beginPath();

      for (let index = 0; index < LABELS.length; index += 1) {
        const angle = startAngle + index * angleStep;
        const levelRadius = radius * (level / 5);

        const x = centerX + Math.cos(angle) * levelRadius;
        const y = centerY + Math.sin(angle) * levelRadius;

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.closePath();
      ctx.strokeStyle = "rgba(48, 29, 16, .22)";
      ctx.lineWidth = .8;
      ctx.stroke();
    }

    for (let index = 0; index < LABELS.length; index += 1) {
      const angle = startAngle + index * angleStep;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(angle) * radius,
        centerY + Math.sin(angle) * radius
      );

      ctx.strokeStyle = "rgba(48, 29, 16, .18)";
      ctx.stroke();
    }

    ctx.beginPath();

    values.forEach((value, index) => {
      const angle = startAngle + index * angleStep;
      const valueRadius = radius * (value / 5);

      const x = centerX + Math.cos(angle) * valueRadius;
      const y = centerY + Math.sin(angle) * valueRadius;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.closePath();

    ctx.fillStyle = "rgba(75, 44, 20, .18)";
    ctx.strokeStyle = "rgba(48, 27, 14, .88)";
    ctx.lineWidth = 1.5;

    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "rgba(39, 24, 14, .86)";
    ctx.font =
      `${Math.max(8, width * .036)}px "Noto Serif JP", serif`;

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    LABELS.forEach((label, index) => {
      const angle = startAngle + index * angleStep;
      const labelRadius = radius * 1.28;

      ctx.fillText(
        label,
        centerX + Math.cos(angle) * labelRadius,
        centerY + Math.sin(angle) * labelRadius
      );
    });
  }

  window.renderFlavorChart = renderFlavorChart;
})();
