// Rotating tagline: each phrase fades in, holds, fades out, then the next appears.
// Edit the phrases here. Also update the screen-reader text in index.html (.tagline .visually-hidden).
const PHRASES = [
  "Data Science",
  "Monitoring, Evaluation, and LEARNING",
  "Data Visualisation",
  "Data Infrastructure",
];

const HOLD_MS = 1500; // how long each phrase stays fully visible
const FADE_MS = 500; // must match --fade-duration in css/styles.css

(function () {
  "use strict";

  const el = document.getElementById("tagline");
  if (!el || PHRASES.length === 0) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let index = 0;

  el.textContent = PHRASES[0];
  el.classList.add("is-visible");

  function wait(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }

  async function loop() {
    while (true) {
      await wait(HOLD_MS + (reduceMotion.matches ? FADE_MS * 2 : 0));
      index = (index + 1) % PHRASES.length;

      if (reduceMotion.matches) {
        // No fading: swap the text in place
        el.textContent = PHRASES[index];
        continue;
      }

      el.classList.remove("is-visible");
      await wait(FADE_MS);
      el.textContent = PHRASES[index];
      el.classList.add("is-visible");
      await wait(FADE_MS);
    }
  }

  if (PHRASES.length > 1) loop();
})();
