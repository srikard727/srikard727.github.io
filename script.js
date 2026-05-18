const revealElements = document.querySelectorAll(".reveal");
const typewriterHeading = document.querySelector(".typewriter");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

if (!("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("visible"));
} else {
  const revealOnScroll = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  revealElements.forEach((element) => revealOnScroll.observe(element));
}

if (typewriterHeading) {
  const fullText =
    typewriterHeading.dataset.text || typewriterHeading.textContent.trim();

  if (prefersReducedMotion.matches) {
    typewriterHeading.textContent = fullText;
  } else {
    typewriterHeading.textContent = "";

    const textSpan = document.createElement("span");
    textSpan.className = "typewriter-text";

    const cursorSpan = document.createElement("span");
    cursorSpan.className = "typewriter-cursor";
    cursorSpan.setAttribute("aria-hidden", "true");

    typewriterHeading.append(textSpan, cursorSpan);

    let index = 0;
    const typingDelay = 70;
    const startDelay = 400;

    const typeNextCharacter = () => {
      textSpan.textContent = fullText.slice(0, index + 1);
      index += 1;

      if (index < fullText.length) {
        window.setTimeout(typeNextCharacter, typingDelay);
      } else {
        cursorSpan.style.animation = "none";
        cursorSpan.style.opacity = "0";
      }
    };

    window.setTimeout(typeNextCharacter, startDelay);
  }
}

const heroSection = document.querySelector(".hero");
const navLinks = Array.from(document.querySelectorAll(".site-nav a[href^='#']"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
const accentColor =
  getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() ||
  "#fa4d4d";

const progressBar = document.createElement("div");
progressBar.setAttribute("aria-hidden", "true");
progressBar.style.position = "fixed";
progressBar.style.left = "0";
progressBar.style.top = "0";
progressBar.style.height = "3px";
progressBar.style.width = "0";
progressBar.style.background = accentColor;
progressBar.style.zIndex = "999";
progressBar.style.transition = "width 120ms ease";
document.body.append(progressBar);

const updateActiveNav = () => {
  if (!sections.length) {
    return;
  }

  const scrollPosition = window.scrollY + window.innerHeight * 0.35;
  let activeIndex = 0;

  sections.forEach((section, index) => {
    if (scrollPosition >= section.offsetTop) {
      activeIndex = index;
    }
  });

  navLinks.forEach((link, index) => {
    if (index === activeIndex) {
      link.style.color = accentColor;
      link.style.borderBottom = `2px solid ${accentColor}`;
      link.style.paddingBottom = "2px";
    } else {
      link.style.color = "";
      link.style.borderBottom = "";
      link.style.paddingBottom = "";
    }
  });
};

const updateScrollProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
  progressBar.style.width = `${Math.min(1, Math.max(0, progress)) * 100}%`;
};

const updateHeroParallax = () => {
  if (!heroSection || prefersReducedMotion.matches) {
    return;
  }

  const offset = Math.min(120, window.scrollY * 0.15);
  heroSection.style.backgroundPosition = `center calc(50% + ${offset}px)`;
};

let isTicking = false;
const handleScroll = () => {
  if (isTicking) {
    return;
  }

  isTicking = true;
  window.requestAnimationFrame(() => {
    updateScrollProgress();
    updateActiveNav();
    updateHeroParallax();
    isTicking = false;
  });
};

updateScrollProgress();
updateActiveNav();
updateHeroParallax();

window.addEventListener("scroll", handleScroll, { passive: true });
window.addEventListener("resize", () => {
  updateScrollProgress();
  updateActiveNav();
});
