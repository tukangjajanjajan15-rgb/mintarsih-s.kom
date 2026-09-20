const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const backToTop = document.getElementById("backToTop");

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuBtn.classList.toggle("open", isOpen);
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuBtn.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav a");

const activateNav = () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 180;
    if (window.scrollY >= sectionTop) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
};

window.addEventListener("scroll", () => {
  activateNav();

  if (window.scrollY > 400) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

activateNav();
