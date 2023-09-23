"use strict";

const allLinks = document.querySelectorAll(".nav__link__i");
const sectionHeroEl = document.querySelector(".hero__section");
const allSections = document.querySelectorAll("section");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    if (link.classList.contains("nav__link"))
      headerEl.classList.toggle("nav-open");
  });
});

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

const revealSection = function (entries, observer) {
  const [entry] = entries;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});
allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

const textElement = document.querySelector(".typewriter-text");
const spanElement = document.querySelector(".span");

const originalText = textElement.textContent;
let currentIndex = 0;
function typeText() {
  textElement.textContent = originalText.substring(0, currentIndex);
  textElement.style.opacity = "1";
  currentIndex++;
  if (currentIndex > originalText.length) {
    currentIndex = originalText.length;
    spanElement.style.opacity = "1";
    setTimeout(function () {
      spanElement.style.opacity = "0";
      currentIndex = 0;
    }, 2000);
  }
}

setInterval(typeText, 100);
