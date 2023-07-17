const findActiveIndex = () => LABEL_ARRAY.findIndex(isActive);
const isActive = (label) => label.classList.contains("active");
const findLabelByInputId = (id) => document.querySelector(`label[for=${id}]`);
const openProject = (label) => {
  if (isActive(label)) console.log("welcome!");
};
const slide = () => {};
const resetClass = () => {
  getLabels().forEach((label) => {
    label.classList.remove("prev");
    label.classList.remove("active");
    label.classList.remove("next");
  });
};
const getLabels = () =>
  document.querySelectorAll(".project-content__carousel__card");

const allRadio = document.querySelectorAll("input");

const LABEL_ARRAY = Array.from(getLabels());
const ARR_LENGTH = LABEL_ARRAY.length;
const findLabelByIndex = (index) => {
  if (index < 0) return LABEL_ARRAY[ARR_LENGTH + index];
  else if (index >= ARR_LENGTH) return LABEL_ARRAY[index % ARR_LENGTH];
  return LABEL_ARRAY[index];
};

allRadio.forEach((radio) => {
  radio.addEventListener("change", () => {
    const labelElement = findLabelByInputId(radio.id);
    const activeIndex = LABEL_ARRAY.findIndex(
      (label) => label === labelElement
    );
    resetClass();
    console.log(labelElement);
    labelElement.classList.add("active");
    findLabelByIndex(activeIndex - 1).classList.add("prev");
    findLabelByIndex(activeIndex + 1).classList.add("next");
  });
});
