import './style.css'

const carsFormEl = document.querySelector('[data-js="third form"]');
const carsTableBodyEl = document.querySelector('[data-js="cars-table"]');

const getFormElement = (e) => (elementName) => e.target.elements[elementName];

const createImage = (value) => {
  const tdEl = document.createElement("td");
  const imgEl = document.createElement("img");
  imgEl.src = value;
  imgEl.width = 100;
  imgEl.style.borderRadius = "0.2rem";
  imgEl.style.marginRight = "0.2rem";
  tdEl.appendChild(imgEl);
  return tdEl;
};

const createText = (value) => {
  const tdEl = document.createElement("td");
  tdEl.textContent = value;
  return tdEl;
};

const createColor = (value) => {
  const tdEl = document.createElement("td");
  const divEl = document.createElement("div");
  divEl.style.width = "6rem";
  divEl.style.height = "6rem";
  divEl.style.background = value;
  divEl.style.borderRadius = "0.2rem";
  tdEl.appendChild(divEl);
  return tdEl;
};

const elementsTypes = {
  image: createImage,
  text: createText,
  color: createColor,
};

const onSubmit = (e) => {
  e.preventDefault();
  const getElement = getFormElement(e);

  const carElements = [
    {
      type: "image",
      value: getElement("car-image").value,
      element: getElement("car-image"),
    },
    { type: "text", value: getElement("car-brand").value },
    { type: "text", value: getElement("car-year").value },
    { type: "text", value: getElement("car-plate").value },
    { type: "color", value: getElement("car-color").value },
  ];

  const trEl = document.createElement("tr");

  carElements.forEach((carElement) => {
    const tdEl = elementsTypes[carElement.type](carElement.value);
    trEl.appendChild(tdEl);
  });

  carsTableBodyEl.appendChild(trEl);
  e.target.reset();
  carElements[0].element.focus();
};

carsFormEl.addEventListener("submit", onSubmit, false);
