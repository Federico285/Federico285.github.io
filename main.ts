// main.ts - simple interactivity (compile with tsc -> main.js)

// Animate skill progress bars when they enter the viewport and toggle theme

document.addEventListener("DOMContentLoaded", () => {
  const skillCards = Array.from(
    document.querySelectorAll<HTMLDivElement>(".skill-card")
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target as HTMLElement;
          const progress = card.dataset.progress;
          const bar = card.querySelector<HTMLElement>(".progress-bar");
          if (bar && progress) {
            // animate to the target percentage
            requestAnimationFrame(() => {
              bar.style.width = progress + "%";
            });
          }
          observer.unobserve(card);
        }
      });
    },
    { threshold: 0.25 }
  );

  skillCards.forEach((c) => observer.observe(c));

  // Theme toggle
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const root = document.documentElement;
      const current = root.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      // optionally persist
      localStorage.setItem("site-theme", next);
    });

    // restore
    const saved = localStorage.getItem("site-theme");
    if (saved) document.documentElement.setAttribute("data-theme", saved);
  }
});
