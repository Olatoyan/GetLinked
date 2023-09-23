"use strict";

const categoryBox = document.querySelector(".category__box");
const formBox = document.querySelector(".form");
const teamEL = document.querySelector(".team");
const phoneEl = document.querySelector(".phone");
const mailEL = document.querySelector(".email");
const projectTopicEl = document.querySelector(".project");
const groupSizeEl = document.querySelector(".group");
const errorText = document.querySelector(".confirm__text");
const checkbox = document.querySelector(".checkbox");
const successContainer = document.querySelector(".success__container");
const overlay = document.querySelector(".overlay");

const categoryMarkup = function (data) {
  const options = data
    .map(
      (item) => `
      <option value="${item.id}">
        ${item.name}
      </option>
    `
    )
    .join("");

  const html = `
        <label for="category">Category</label>
        <select id="category" class="category input">
          ${options}
        </select>
  `;

  categoryBox.insertAdjacentHTML("beforeend", html);
  const categoryEl = document.querySelector(".category");

  formBox.addEventListener("submit", function (e) {
    e.preventDefault();

    if (
      !teamEL.value.trim() ||
      !phoneEl.value.trim() ||
      !mailEL.value.trim() ||
      !projectTopicEl.value.trim()
    ) {
      showError();
    } else if (phoneEl.value.length !== 11) {
      showError();
    } else if (!checkbox.checked) {
      showError();
    } else {
      hideError();
      const formData = {
        team_name: teamEL.value.trim(),
        phone_number: phoneEl.value.trim(),
        email: mailEL.value.trim(),
        project_topic: projectTopicEl.value.trim(),
        group_size: groupSizeEl.value,
        category: categoryEl.value,
        privacy_poclicy_accepted: checkbox.value,
      };
      sendRegistration(formData);
      showSuccess();
    }
  });
};

const getCategories = async function () {
  const res = await fetch(
    "https://backend.getlinked.ai/hackathon/categories-list"
  );
  const data = await res.json();
  categoryMarkup(data);
};
getCategories();

phoneEl.addEventListener("input", () => {
  phoneEl.value = phoneEl.value.replace(/[^0-9]/g, "");

  if (phoneEl.value.length > 11) {
    phoneEl.value = phoneEl.value.slice(0, 11);
  }
});

const sendRegistration = async function (formData) {
  const res = await fetch(
    "https://backend.getlinked.ai/hackathon/registration",
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

function showError() {
  errorText.style.opacity = "1";
  errorText.style.visibility = "visible";
}

function hideError() {
  errorText.style.opacity = "0";
  errorText.style.visibility = "hidden";
}

function showSuccess() {
  successContainer.classList.remove("hidden");
  overlay.classList.remove("hidden");
}
