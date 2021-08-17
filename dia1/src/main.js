import "./style.css";

const rootDiv = document.querySelector('[data-js="app"]');

rootDiv.innerHTML = `
  <h1>B. Academy</h1>
  <p>Boas vindas à semana de pré-work para o Bootcamp em React.js 😁</p>
`;

const visibilityChangerEl = document.querySelector(
  '[data-js="visibility-changer"]'
);

const changeVisibility = (e) => {
  e.preventDefault();
  rootDiv.classList.toggle("hidden");
};

visibilityChangerEl.addEventListener("click", changeVisibility, false);
