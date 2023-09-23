"use strict";

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header__box");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});


