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
    updateHeroParallax();
    isTicking = false;
  });
};

updateHeroParallax();

window.addEventListener("scroll", handleScroll, { passive: true });
