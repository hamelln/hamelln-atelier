import addClickAndEnterHandler from "../utils/addClickAndEnterHandler.js";

export default function Spec(
  { startDay, endDay, member, skill, role, characterImage },
  renderProject
) {
  const makeBox = () => {
    const boxElem = document.createElement("div");
    boxElem.classList.add("project-content__spec");
    return boxElem;
  };

  const makeFigure = () => {
    const figureElem = document.createElement("figure");
    const imgElem = document.createElement("img");
    figureElem.classList.add("project-content__spec__character");
    imgElem.classList.add("project-content__spec__character__image");
    imgElem.src = characterImage;
    imgElem.alt = ".project character image";
    figureElem.appendChild(imgElem);
    return figureElem;
  };

  const makeDescribe = () => {
    const boxElem = document.createElement("div");
    const describeElem = document.createElement("div");
    const pElem = document.createElement("p");
    const EnterElem = document.createElement("p");

    boxElem.classList.add("project-content__spec__box");
    describeElem.classList.add("project-content__spec__describe__box");
    pElem.classList.add("project-content__spec__box__describe");
    EnterElem.classList.add("project-content__spec__box__Enter");
    EnterElem.classList.add("focusable");
    EnterElem.tabIndex = 0;

    describeElem.appendChild(pElem);
    describeElem.appendChild(EnterElem);
    boxElem.appendChild(describeElem);

    EnterElem.textContent = "Enter";
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
    const list = document.querySelectorAll(".project-box__info__item");
    for (const item of list) {
      if (item.textContent === "spec") {
        addFocus(item);
        break;
      }
    }
  };

  const render = () => {
    let elem = document.querySelector(".project-content");
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
