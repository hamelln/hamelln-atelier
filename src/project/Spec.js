import addClickAndEnterHandler from "../utils/addClickAndEnterHandler.js";
import {
  addAttribute,
  makeElementWithClasses,
  makeImg,
} from "../utils/controllDOM.js";

export default function Spec(
  { startDay, endDay, member, skill, role, characterImage },
  renderProject
) {
  const animateText = (specDescription) => {
    const descriptionTemplate = [
      `<span class="project-content__spec__box__skill">`,
      member,
      `</span>`,
      `인이 작업했습니다.`,
      `<br />`,
      `<span class="project-content__spec__box__skill">`,
      startDay,
      `</span>`,
      `부터 `,
      `<span class="project-content__spec__box__skill">`,
      endDay,
      `</span>`,
      `까지 진행했어요.`,
      `<br />`,
      `이 프로젝트에 사용된 기술은 `,
      `<span class="project-content__spec__box__skill">`,
      skill,
      `</span>`,
      `입니다.`,
      `<br />`,
      `저는 `,
      `<span class="project-content__spec__box__skill">`,
      role,
      `</span>`,
      `를 담당했습니다.`,
    ];

    let currentText = ``;
    let index = 0;
    let charIndex = 0;
    const MAX_LENGTH = descriptionTemplate.length;

    const isHTML = (text) => text[0] === "<";

    const printAtOnce = (text) => {
      currentText += text;
      specDescription.innerHTML = currentText;
      index++;
    };

    const printPerChar = (text) => {
      if (charIndex < text.length) {
        currentText += text[charIndex];
        specDescription.innerHTML = currentText;
        charIndex++;
      } else {
        charIndex = 0;
        index++;
      }
    };

    const animate = () => {
      if (index >= MAX_LENGTH) return;
      const text = descriptionTemplate[index];
      (isHTML(text) ? printAtOnce : printPerChar)(text);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  const render = () => {
    const parent = document.querySelector(".project-content");
    const specBox = makeElementWithClasses("div")("project-content__spec");
    const characterFigure = makeElementWithClasses("figure")(
      "project-content__spec__character"
    );
    const character = makeImg("project-content__spec__character__image")(
      characterImage
    )("project character image");
    const specInnerBox = makeElementWithClasses("div")(
      "project-content__spec__box"
    );
    const descriptionBox = makeElementWithClasses("div")(
      "project-content__spec__describe__box"
    );
    const specDescription = makeElementWithClasses("p")(
      "project-content__spec__box__describe"
    );
    const specEnterButton = makeElementWithClasses("p")(
      "project-content__spec__box__Enter",
      "focusable"
    );
    characterFigure.appendChild(character);
    addAttribute(specEnterButton)({ tabIndex: 0, text: "Enter" });
    descriptionBox.appendChild(specDescription);
    descriptionBox.appendChild(specEnterButton);
    specInnerBox.appendChild(descriptionBox);
    addClickAndEnterHandler(specEnterButton)(renderProject);
    specBox.appendChild(characterFigure);
    specBox.appendChild(specInnerBox);
    parent.innerHTML = "";
    parent.appendChild(specBox);
    animateText(specDescription);
    specEnterButton.focus();
  };

  render();
}
