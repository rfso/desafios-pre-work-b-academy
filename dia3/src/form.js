const inputName = document.querySelector('[data-js="name"]');

const capitalizeFirstLetter = (str) => {
  const verifyStr = (str) =>
    str === "de" || str === "da" || str === "do" || str === "dos"
      ? true
      : false;

  if (verifyStr(str)) {
    return str.toLowerCase();
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
};

inputName.addEventListener("input", (e) => {
  const inputNameValue = e.target.value.toLowerCase();
  const finalInputValue = inputNameValue
    .split(" ")
    .map(capitalizeFirstLetter)
    .join(" ");

  e.target.value = finalInputValue;
});

//
// Solução do SEGUNDO exercício
//

const colorsContainer = document.createElement("div");
const formEl = document.querySelector('[data-js="form"]');
const optionsArr = ["red", "blue", "pink", "black", "purple"];
const selectEl = document.createElement("select");

const createOptionEl = (option) => {
  const optionEl = document.createElement("option");
  optionEl.textContent = option;
  optionEl.value = option;
  return optionEl;
};

const createColorDiv = (color) => {
  const colorDiv = document.createElement("div");
  colorDiv.style.background = `${color}`;
  colorDiv.style.width = "6rem";
  colorDiv.style.height = "6rem";
  colorDiv.style.marginBottom = "1rem";
  return colorDiv;
};

optionsArr.forEach((option) => {
  const finalOptionEl = createOptionEl(option);
  selectEl.appendChild(finalOptionEl);
});

const onSelectChange = (e) => {
  colorsContainer.innerHTML = "";
  const selectedOptions = [...e.target.selectedOptions];
  const selectedValues = selectedOptions.map((option) => {
    const finalColorDiv = createColorDiv(option.value);
    colorsContainer.appendChild(finalColorDiv);
  });
};

formEl.appendChild(selectEl);
document.body.appendChild(colorsContainer);

selectEl.setAttribute("multiple", "");
selectEl.addEventListener("change", onSelectChange, false);
