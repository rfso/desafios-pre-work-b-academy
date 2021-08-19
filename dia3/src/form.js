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
