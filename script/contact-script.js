"use strict";

const nameEl = document.querySelector(".name");
const emailEl = document.querySelector(".email");
const messageEl = document.querySelector(".message");
const submitBtn = document.querySelector(".form__cta");
const formBox = document.querySelector(".form");
const errorText = document.querySelector(".error__text");

formBox.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    !nameEl.value.trim() ||
    !emailEl.value.trim() ||
    !messageEl.value.trim()
  ) {
    errorText.style.opacity = "1";
    errorText.style.visibility = "visible";
  } else {
    errorText.style.opacity = "0";
    errorText.style.visibility = "hidden";

    const formData = {
      first_name: nameEl.value.trim(),
      email: emailEl.value.trim(),
      message: messageEl.value,
    };
    contactUS(formData);
  }
});

const contactUS = async function (formData) {
  const res = await fetch(
    "https://backend.getlinked.ai/hackathon/contact-form",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

  const data = await res.json();
};
