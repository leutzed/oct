const toggle = document.querySelector(".slider");
const theme = window.localStorage.getItem("theme");

if (theme === "dark") {
  document.body.classList.add("dark-mode");
}

toggle.addEventListener("click", () => {
  console.log('click');
  document.body.classList.toggle("dark-mode");
  if (theme === "dark") {
    window.localStorage.setItem("theme", "light");
  } else window.localStorage.setItem("theme", "dark");
});