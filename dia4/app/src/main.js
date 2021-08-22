import "./style.css";
import { GET, POST } from "./apiMethods";

const apiEndpoint = "http://localhost:3333/cars";

const carsFormEl = document.querySelector('[data-js="third form"]');
const carsTableBodyEl = document.querySelector('[data-js="cars-table"]');

const getFormElement = (e) => (elementName) => e.target.elements[elementName];

const createImage = (value) => {
  const tdEl = document.createElement("td");
  const imgEl = document.createElement("img");
  imgEl.src = value.src;
  imgEl.width = 100;
  imgEl.alt = value.alt;
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

const onSubmit = async (e) => {
  e.preventDefault();
  const getElement = getFormElement(e);

  const data = {
    carImage: getElement("car-image").value,
    carBrand: getElement("car-brand").value,
    carYear: getElement("car-year").value,
    carPlate: getElement("car-plate").value,
    carColor: getElement("car-color").value,
  };

  const carsInfoPostResult = await POST(apiEndpoint, data);

  if (carsInfoPostResult.error) {
    console.log(
      "An error has occurred while trying to register the car:",
      carsInfoPostResult.message
    );
    return;
  }

  const noContent = document.querySelector("[data-js=no-content]");
  if (noContent) {
    carsTableBodyEl.removeChild(noContent)
  }

  createTableRow(data);

  clearAllFields(e);
  focusAfterSubmit(e);
};

carsFormEl.addEventListener("submit", onSubmit, false);

const createTableRow = (data) => {
  const trEl = document.createElement("tr");

  const carElements = [
    { type: "image", value: { src: data.carImage, alt: data.carBrand } },
    { type: "text", value: data.carBrand },
    { type: "text", value: data.carYear },
    { type: "text", value: data.carPlate },
    { type: "color", value: data.carColor },
  ];

  carElements.forEach((carElement) => {
    const tdEl = elementsTypes[carElement.type](carElement.value);
    trEl.appendChild(tdEl);
  });

  carsTableBodyEl.appendChild(trEl);
};

const createNoCarRow = () => {
  const trEl = document.createElement("tr");
  const tdEl = document.createElement("td");
  const thsLength = document.querySelectorAll("table th").length;

  tdEl.setAttribute("colspan", thsLength);
  tdEl.textContent = "No cars have been found";
  tdEl.style.color = "#f36";

  trEl.dataset.js = "no content";
  trEl.appendChild(tdEl);
  carsTableBodyEl.appendChild(trEl);
};

const clearAllFields = (e) => {
  e.target.reset();
};

const focusAfterSubmit = (e) => {
  const focusImageInput = getFormElement(e)("car-image");
  focusImageInput.focus();
};

const getCarsFromApi = async () => {
  const carsInfoGetResult = await GET(apiEndpoint);

  if (carsInfoGetResult.error) {
    console.log("An error has occurred:", carsInfoGetResult.message);
    return;
  }

  if (carsInfoGetResult.length === 0) {
    createNoCarRow();
    return;
  }

  carsInfoGetResult.forEach(createTableRow);
};

getCarsFromApi();
