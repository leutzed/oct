const toggle = document.querySelector(".slider");
let theme = window.localStorage.getItem("theme");

// check if the value in localStorage is empty and set it to 'light' by default
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

// Atualize a classe com base no valor de 'theme' do localStorage
if (theme === "dark") {
  document.body.classList.add("dark-mode");
}

toggle.addEventListener("click", () => {
  console.log('click');
  toggleDarkMode();
});

// Você também pode adicionar um ouvinte de evento DOMContentLoaded para garantir que a classe
// seja definida corretamente no carregamento da página
document.addEventListener("DOMContentLoaded", () => {
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
  }
});
