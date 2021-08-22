import "./style.css";
import { GET, POST, DELETE } from "./apiMethods";

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
    image: getElement("car-image").value,
    brandModel: getElement("car-brand").value,
    year: getElement("car-year").value,
    plate: getElement("car-plate").value,
    color: getElement("car-color").value,
  };

  const carsInfoPostResult = await POST(apiEndpoint, data);

  if (carsInfoPostResult.error) {
    showMessageInfo(carsInfoPostResult.message);
    console.log(
      "An error has occurred while trying to register the car:",
      carsInfoPostResult.message
    );
    return;
  }

  showMessageInfo(carsInfoPostResult.message);

  const noContent = document.querySelector("[data-js=no-content]");
  if (noContent) {
    carsTableBodyEl.removeChild(noContent);
  }

  createTableRow(data);

  clearAllFields(e);
  focusAfterSubmit(e);
};

carsFormEl.addEventListener("submit", onSubmit, false);

const createTableRow = (data) => {
  const trEl = document.createElement("tr");
  trEl.dataset.plate = data.plate;

  const carElements = [
    { type: "image", value: { src: data.image, alt: data.brandModel } },
    { type: "text", value: data.brandModel },
    { type: "text", value: data.year },
    { type: "text", value: data.plate },
    { type: "color", value: data.color },
  ];

  carElements.forEach((carElement) => {
    const tdEl = elementsTypes[carElement.type](carElement.value);
    trEl.appendChild(tdEl);
  });

  const carDeleteBtn = createCarDeleteBtn(data);

  trEl.appendChild(carDeleteBtn);
  carsTableBodyEl.appendChild(trEl);
};

const handleDelete = async (e) => {
  e.preventDefault();
  const buttonTarget = e.target;
  const plate = e.target.dataset.plate;

  const carsInfoDeleteResult = await DELETE(apiEndpoint, { plate });

  if (carsInfoDeleteResult.error) {
    showMessageInfo(carsInfoDeleteResult.message);
    console.log(
      "An error has occurred while trying to delete the car:",
      carsInfoDeleteResult.message
    );
    return;
  }

  showMessageInfo(carsInfoDeleteResult.message);

  const trEl = document.querySelector(`tr[data-plate="${plate}"]`);
  carsTableBodyEl.removeChild(trEl);

  buttonTarget.removeEventListener("click", handleDelete, false);

  const allTrs = carsTableBodyEl.querySelector("tr");
  if (!allTrs) createNoCarRow();
};

const showMessageInfo = (messageInfo) => {
  const InfoEl = document.createElement("span");
  const buttonContainer = document.querySelector(
    '[data-js="submit btn container"]'
  );

  console.log(buttonContainer, InfoEl)

  InfoEl.textContent = messageInfo;
  InfoEl.style.color = "#f36";

  buttonContainer.appendChild(InfoEl);

  setTimeout(() => {
    InfoEl.remove();
  }, 6000);
};

const createCarDeleteBtn = (data) => {
  const buttonEl = document.createElement("button");
  buttonEl.textContent = "Delete";
  buttonEl.dataset.plate = data.plate;
  buttonEl.addEventListener("click", handleDelete);
  buttonEl.classList.add("btn");
  buttonEl.style.marginTop = "1.2rem";

  return buttonEl;
};

const createNoCarRow = () => {
  const trEl = document.createElement("tr");
  const tdEl = document.createElement("td");
  const thsLength = document.querySelectorAll("table th").length;

  tdEl.setAttribute("colspan", thsLength);
  tdEl.textContent = "No cars have been found";
  tdEl.style.color = "#f36";

  trEl.dataset.js = "no-content";
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
    showMessageInfo(carsInfoGetResult.message);
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
