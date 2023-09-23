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
const allLinks = document.querySelectorAll(".nav__link");
allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    if (link.classList.contains("nav__link"))
      headerEl.classList.toggle("nav-open");
  });
});

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

  categoryBox.innerHTML += html;

  formBox.addEventListener("submit", async function (e) {
    e.preventDefault();

    const categoryEl = document.querySelector(".category");
    const teamName = teamEL.value.trim();
    const phoneNumber = phoneEl.value.trim();
    const email = mailEL.value.trim();
    const projectTopic = projectTopicEl.value.trim();

    if (!teamName || !phoneNumber || !email || !projectTopic) {
      showError();
    } else if (phoneNumber.length !== 11) {
      showError();
    } else if (!checkbox.checked) {
      showError();
    } else {
      hideError();
      const formData = {
        team_name: teamName,
        phone_number: phoneNumber,
        email: email,
        project_topic: projectTopic,
        group_size: groupSizeEl.value,
        category: categoryEl.value,
        privacy_poclicy_accepted: checkbox.value,
      };
      sendRegistration(formData);
      location.reload();
    }
  });
};

const getCategories = async function () {
  try {
    const res = await fetch(
      "https://backend.getlinked.ai/hackathon/categories-list"
    );
    const data = await res.json();
    categoryMarkup(data);
  } catch (error) {
    console.log(error);
  }
};
getCategories();

phoneEl.addEventListener("input", () => {
  phoneEl.value = phoneEl.value.replace(/[^0-9]/g, "");

  if (phoneEl.value.length > 11) {
    phoneEl.value = phoneEl.value.slice(0, 11);
  }
});

const sendRegistration = async function (formData) {
  try {
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
    console.log(data);
  } catch (error) {
    console.log(error);
  }
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
