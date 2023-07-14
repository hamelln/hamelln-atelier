import addClickAndEnterHandler from "../utils/addClickAndEnterHandler.js";
import {
  addAttribute,
  getByQuery,
  getByQueryAll,
} from "../utils/controllDOM.js";

export default function Spec(
  { startDay, endDay, member, skill, role, characterImage },
  renderProject
) {
  const makeBox = () => {
    return makeElementWithClasses("div")("project-content__spec");
  };

  const makeFigure = () => {
    const src = characterImage;
    const alt = "project character image";
    const figureElem = makeElementWithClasses("figure")(
      "project-content__spec__character"
    );
    const imgElem = makeElementWithClasses("img")(
      "project-content__spec__character__image"
    );
    addAttribute(imgElem)({ src, alt });
    figureElem.appendChild(imgElem);
    return figureElem;
  };

  const makeDescribe = () => {
    const boxElem = makeElementWithClasses("div")("project-content__spec__box");
    const describeElem = makeElementWithClasses("div")(
      "project-content__spec__describe__box"
    );
    const pElem = makeElementWithClasses("p")(
      "project-content__spec__box__describe"
    );
    const EnterElem = makeElementWithClasses("p")(
      "project-content__spec__box__Enter",
      "focusable"
    );
    addAttribute(EnterElem)({ tabIndex: 0, text: "Enter" });
    describeElem.appendChild(pElem);
    describeElem.appendChild(EnterElem);
    boxElem.appendChild(describeElem);
    addClickAndEnterHandler(EnterElem)(renderProject);
    return boxElem;
  };

  const makeHTML = () => {
    const boxElem = makeBox();
    const figureElem = makeFigure();
    const describeElem = makeDescribe();
    boxElem.appendChild(figureElem);
    boxElem.appendChild(describeElem);
    return boxElem;
  };

  const isHTML = (text) => text[0] === "<";

  const updateText = (boxElem) => {
    const pElem = boxElem.querySelector("p");
    const htmlArray = [
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

    const animateText = () => {
      if (index >= htmlArray.length) return;
      const text = htmlArray[index];
      if (isHTML(text)) {
        currentText += text;
        pElem.innerHTML = currentText;
        index++;
      } else {
        if (charIndex < text.length) {
          currentText += text[charIndex];
          pElem.innerHTML = currentText;
          charIndex++;
        } else {
          charIndex = 0;
          index++;
        }
      }
      requestAnimationFrame(animateText);
    };

    requestAnimationFrame(animateText);
  };

  const focus = () => {
    const list = getByQueryAll(".project-box__info__item");
    for (const item of list) {
      if (item.textContent === "spec") {
        addFocus(item);
        break;
      }
    }
  };

  const render = () => {
    let elem = getByQuery(".project-content");
    elem.innerHTML = "";
    const boxElem = makeHTML();
    elem.appendChild(boxElem);
    setTimeout(() => {
      updateText(boxElem);
      const enterElem = boxElem.querySelector(".focusable");
      enterElem.focus();
    }, 100);
  };

  render();
}
