// Mobile navigation menu toggle
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu when clicking outside or clicking any nav link
  document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Interactive subtle parallax on the cosmic portal following mouse movement
const portal = document.querySelector(".cosmic-portal-container");

if (portal) {
  window.addEventListener("mousemove", (e) => {
    const x = (window.innerWidth / 2 - e.clientX) / 45;
    const y = (window.innerHeight / 2 - e.clientY) / 45;
    portal.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
  });
}

// Animated counter effect for stat numbers
const statNumbers = document.querySelectorAll(".stat-number");

const animateCounters = () => {
  statNumbers.forEach(counter => {
    const target = parseFloat(counter.getAttribute("data-target"));
    const suffix = counter.getAttribute("data-suffix") || "";
    if (isNaN(target)) return;

    let current = 0;
    const steps = 30;
    const increment = target / steps;
    const stepTime = 30;

    const updateValue = () => {
      current += increment;
      if (current >= target) {
        counter.textContent = target + suffix;
      } else {
        counter.textContent = Math.round(current) + suffix;
        setTimeout(updateValue, stepTime);
      }
    };

    updateValue();
  });
};

// Intersection Observer for active nav highlighting on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("#navMenu a");

window.addEventListener("scroll", () => {
  let scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 120;
    const sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
});

// Start counter animation when DOM is loaded
window.addEventListener("DOMContentLoaded", () => {
  animateCounters();
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
