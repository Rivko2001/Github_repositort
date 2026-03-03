(function () {
  const effects = document.getElementById("effectsLayer");
  const submitBtn = document.getElementById("submitRatings");
  const avgOut = document.getElementById("avgOut");
  const starContainers = document.querySelectorAll(".stars");

  // Build 5 stars per question
  starContainers.forEach((wrap) => {
    wrap.innerHTML = "";
    for (let i = 1; i <= 5; i++) {
      const s = document.createElement("span");
      s.className = "star off";
      s.textContent = "★";
      s.dataset.value = String(i);
      s.addEventListener("click", () => {
        wrap.dataset.value = String(i);
        paintStars(wrap, i);
      });
      wrap.appendChild(s);
    }
  });

  function paintStars(wrap, value) {
    wrap.querySelectorAll(".star").forEach((star) => {
      const v = Number(star.dataset.value);
      star.classList.toggle("on", v <= value);
      star.classList.toggle("off", v > value);
    });
  }

  function getValues() {
    const values = [];
    document.querySelectorAll(".rating-item .stars").forEach((wrap) => {
      values.push(Number(wrap.dataset.value || "0"));
    });
    return values;
  }

  function clearEffects() {
    effects.innerHTML = "";
  }

  // Simple random color without hardcoding specific palette
  function randomColor() {
    // pastel-ish via HSL
    const h = Math.floor(Math.random() * 360);
    return `hsl(${h} 90% 60%)`;
  }

  function showConfetti(durationMs = 5000) {
    clearEffects();
    const endAt = Date.now() + durationMs;
    const interval = setInterval(() => {
      // burst
      for (let i = 0; i < 18; i++) {
        const c = document.createElement("div");
        c.className = "confetti";
        c.style.left = Math.random() * 100 + "vw";
        c.style.background = randomColor();
        c.style.animationDuration = (2.2 + Math.random() * 1.8) + "s";
        c.style.transform = `rotate(${Math.random() * 360}deg)`;
        effects.appendChild(c);

        // cleanup each piece
        setTimeout(() => c.remove(), 4500);
      }
      if (Date.now() > endAt) {
        clearInterval(interval);
        setTimeout(clearEffects, 600);
      }
    }, 250);
  }

  function showSadRain(durationMs = 10000) {
    clearEffects();
    const endAt = Date.now() + durationMs;

    const interval = setInterval(() => {
      for (let i = 0; i < 10; i++) {
        const s = document.createElement("div");
        s.className = "sad";
        s.textContent = "😢";
        // rain near left side, a bit spread
        s.style.left = (6 + Math.random() * 180) + "px";
        s.style.animationDuration = (2.2 + Math.random() * 2.8) + "s";
        s.style.fontSize = (14 + Math.random() * 12) + "px";
        effects.appendChild(s);
        setTimeout(() => s.remove(), 5500);
      }

      if (Date.now() > endAt) {
        clearInterval(interval);
        setTimeout(clearEffects, 800);
      }
    }, 350);
  }

  submitBtn.addEventListener("click", () => {
    const values = getValues();
    if (values.some(v => v === 0)) {
      avgOut.textContent = "Geef bij alle 4 vragen een score (1–5).";
      return;
    }

    const sum = values.reduce((a, b) => a + b, 0);
    const avg = sum / values.length;
    avgOut.textContent = `Gemiddelde score: ${avg.toFixed(2)} / 5`;

    if (avg > 4) {
      showConfetti(5000);
    } else if (avg < 2) {
      showSadRain(10000);
    } else {
      clearEffects();
    }
  });
})();