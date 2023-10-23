const toggle = document.querySelector(".slider");
let theme = window.localStorage.getItem("theme");

if (!theme) {
  theme = "light";
  window.localStorage.setItem("theme", theme);
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  if (theme === "dark") {
    theme = "light";
  } else {
    theme = "dark";
  }
  window.localStorage.setItem("theme", theme);
}

if (theme === "dark") {
  document.body.classList.add("dark-mode");
}

toggle.addEventListener("click", () => {
  console.log('click');
  toggleDarkMode();
});

document.addEventListener("DOMContentLoaded", () => {
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
  }
});
