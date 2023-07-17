const allLabels = document.querySelectorAll(".project-content__carousel__card");
const labelArray = Array.from(allLabels);
const findActiveIndex = () => labelArray.findIndex(isActive);
const isActive = (label) => label.classList.contains("active");
const isNext = (label) => label.classList.contains("next");
const isPrev = (label) => label.classList.contains("prev");
const findLabelByInputId = (id) => document.querySelector(`label[for=${id}]`);
const openProject = (label) => {
  if (isActive(label)) console.log("welcome!");
};
const slide = () => {};

const allRadio = document.querySelectorAll("input");
allRadio.forEach((radio) => {
  radio.addEventListener("change", () => {
    const labelElement = document.querySelector(`label[for=${radio.id}]`);
    console.log(labelElement);
  });
});
