/* =========================================================
   SCRIPT.JS
   Rayhan — Modern Portfolio
   ========================================================= */


/* =========================================================
   1. ELEMENT SELECTOR
   ========================================================= */

const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section");
const revealElements = document.querySelectorAll(".reveal");


/* =========================================================
   2. MOBILE MENU
   ========================================================= */

if (menuToggle && navMenu) {

  menuToggle.addEventListener("click", () => {

    const isOpen = menuToggle.classList.toggle("open");

    navMenu.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Tutup menu" : "Buka menu"
    );

  });

}


/* =========================================================
   3. CLOSE MENU AFTER CLICK
   ========================================================= */

navLinks.forEach((link) => {

  link.addEventListener("click", () => {

    if (!menuToggle || !navMenu) {
      return;
    }

    menuToggle.classList.remove("open");

    navMenu.classList.remove("open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.setAttribute(
      "aria-label",
      "Buka menu"
    );

  });

});


/* =========================================================
   4. NAVBAR SCROLL EFFECT
   ========================================================= */

function updateNavbar() {

  if (!navbar) {
    return;
  }

  if (window.scrollY > 30) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

}

window.addEventListener("scroll", updateNavbar);

updateNavbar();


/* =========================================================
   5. ACTIVE NAVIGATION
   ========================================================= */

function updateActiveNav() {

  const scrollPosition =
    window.scrollY + 150;

  let currentSection = "";

  sections.forEach((section) => {

    const sectionTop = section.offsetTop;

    const sectionHeight = section.offsetHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }

  });


  navLinks.forEach((link) => {

    link.classList.remove("active");

    const target =
      link.getAttribute("href");

    if (target === `#${currentSection}`) {
      link.classList.add("active");
    }

  });

}

window.addEventListener("scroll", updateActiveNav);

updateActiveNav();


/* =========================================================
   6. SCROLL REVEAL
   ========================================================= */

if ("IntersectionObserver" in window) {

  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );


  revealElements.forEach((element) => {

    revealObserver.observe(element);

  });

} else {

  /* Fallback untuk browser lama */

  revealElements.forEach((element) => {

    element.classList.add("visible");

  });

}


/* =========================================================
   7. STAGGER ANIMATION
   ========================================================= */

const animatedGroups = [
  ".about-grid .reveal",
  ".skills-grid .reveal",
  ".roadmap .reveal"
];

animatedGroups.forEach((selector) => {

  const elements =
    document.querySelectorAll(selector);

  elements.forEach((element, index) => {

    element.style.transitionDelay =
      `${index * 0.08}s`;

  });

});


/* =========================================================
   8. RESET DELAY AFTER ANIMATION
   ========================================================= */

revealElements.forEach((element) => {

  element.addEventListener(
    "transitionend",
    () => {

      element.style.transitionDelay = "0s";

    },
    { once: true }
  );

});


/* =========================================================
   9. CLOSE MOBILE MENU WHEN RESIZING
   ========================================================= */

window.addEventListener("resize", () => {

  if (window.innerWidth >= 768) {

    if (menuToggle) {
      menuToggle.classList.remove("open");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        "Buka menu"
      );
    }

    if (navMenu) {
      navMenu.classList.remove("open");
    }

  }

});


/* =========================================================
   10. EMAIL LINK
   ========================================================= */

const emailLink =
  document.querySelector(".email-link");

if (emailLink) {

  emailLink.addEventListener("click", () => {

    console.log(
      "Opening Rayhan's email contact..."
    );

  });

}


/* =========================================================
   11. PAGE LOADED
   ========================================================= */

window.addEventListener("load", () => {

  document.body.classList.add("loaded");

});