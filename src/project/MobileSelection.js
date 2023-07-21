import createElement from "../handlers/element-creater.js";
import { play } from "../handlers/sound-handler.js";
import Loading from "./Loading.js";
import Project from "./Project.js";

const data = {
  Hamelln: {
    uuid: "bea4bbcc-21f3-11ee-be56-0242ac120002",
    title: "Hamelln",
    siteUrl: "https://hamelln.vercel.app/",
    codeUrl: "https://github.com/hamelln/hamelln",
    docsUrl:
      "https://separate-flea-6a7.notion.site/Hamelln-f06d994d44a64992a90d3d573ef03a50?pvs=4",
    backgroundImage: "./public/img/about.png",
    describe: "나를 소개하는 홈페이지",
    skillOverview: ["HTML", "CSS", "JavaScript"],
    spec: {
      startDay: "2023.03",
      endDay: "2023.07",
      member: "1",
      skill: ["HTML", "CSS", "JavaScript"],
      role: "기획, 디자인, 프론트엔드",
      characterImage: "./public/img/character.png",
    },
    feature: {
      challenge:
        "이 사이트는 크롬을 기준으로 만들었어요. 그래서 삼성 인터넷으로 켰을 때 스타일이 무너진 걸 봤죠.",
      approach:
        "스타일을 통일할 필요를 느꼈고, 이러한 크로스 브라우징 대책으로 normalize를 선택했어요.",
      outcome: "그 결과 여러 브라우저에 동일한 경험을 제공할 수 있었습니다.",
    },
  },
  COFFEEN: {
    uuid: "95000cc1-beb9-4c77-8812-13a8be2d5a16",
    title: "COFFEEN",
    siteUrl: "https://coffeen.vercel.app/",
    codeUrl: "https://github.com/hamelln/coffeen",
    docsUrl:
      "https://separate-flea-6a7.notion.site/COFFEEN-020f99bf6c1e47b194843fc5964fe799?pvs=4",
    backgroundImage: "./public/img/COFFEEN.webp",
    describe: "커피 간단 소개",
    skillOverview: ["Next.js", "React", "TypeScript"],
    spec: {
      startDay: "2022.10",
      endDay: "2023.04",
      member: "1",
      skill: [
        "Next.js",
        "React",
        "TypeScript",
        "Recoil",
        "Styled-Components",
        "Jest",
      ],
      role: "기획, 디자인, 프론트엔드",
      characterImage: "./public/img/character.png",
    },
    feature: {
      challenge:
        "이 사이트는 크롬을 기준으로 만들었어요. 그래서 삼성 인터넷으로 켰을 때 스타일이 무너진 걸 봤죠.",
      approach:
        "스타일을 통일할 필요를 느꼈고, 이러한 크로스 브라우징 대책으로 normalize를 선택했어요.",
      outcome: "그 결과 여러 브라우저에 동일한 경험을 제공할 수 있었습니다.",
    },
  },
  Modak: {
    uuid: "2d36e029-2d89-48a0-a919-7ad06030fe9b",
    title: "Modak",
    siteUrl: null,
    codeUrl: null,
    docsUrl:
      "https://separate-flea-6a7.notion.site/fc3147e4613c4da7b3d6f8ae116331c9?pvs=4",
    backgroundImage: "./public/img/modak.webp",
    describe: "캠핑족에게 정보, 리뷰 제공",
    skillOverview: ["Next.js", "React", "TypeScript"],
    spec: {
      startDay: "2022.01",
      endDay: "2022.02",
      member: "5",
      skill: [
        "Next.js",
        "React",
        "TypeScript",
        "Redux",
        "Styled-Components",
        "Jest",
      ],
      role: "마이페이지",
      characterImage: "./public/img/character.png",
    },
    feature: {
      challenge: "",
      approach: "",
      outcome: "",
    },
  },
  반려in: {
    uuid: "6bb4b7ce-a576-423c-96d1-95fc5f376f35",
    title: "반려in",
    siteUrl: null,
    codeUrl: null,
    docsUrl:
      "https://separate-flea-6a7.notion.site/in-86c4c117c2fe4135b000a2e1ac365762?pvs=4",
    backgroundImage: "./public/img/banryeoin.webp",
    bgmUrl: "./public/sound/bgm.mp3",
    describe: "유기 동물 입양 커뮤니티",
    skillOverview: ["HTML", "CSS", "JavaScript"],
    spec: {
      startDay: "2021.12.14",
      endDay: "2021.12.25",
      member: "6",
      skill: ["HTML", "CSS", "JavaScript"],
      role: "마이페이지",
      characterImage: "./public/img/character.png",
    },
    feature: {
      challenge: "",
      approach: "",
      outcome: "",
    },
  },
};

const SELECT_SOUND = document.querySelector("#project-sound");
const START_SOUND = document.querySelector("#game-start");
const PROJECT_ID_LIST = ["반려in", "Hamelln", "COFFEEN", "Modak"];
const LIST_LENGTH = PROJECT_ID_LIST.length;
const DEFAULT_INPUT_NUMBER = 2;
let inputIndex = DEFAULT_INPUT_NUMBER - 1;

const inputList = () => document.querySelectorAll("input");
const labelList = () =>
  document.querySelectorAll(".project-content__carousel__card");

const createCarousel = (projectTitle) => {
  const carousel = createElement("div", { class: "project-content__carousel" });
  const inputs = createInputs();
  const projectBox = createCarouselCards(inputs);
  const projectSkillBox = createSkillBox(data[projectTitle]);
  const titleBox = createTitleBox(projectTitle);

  inputs.map((inputElement) => {
    carousel.appendChild(inputElement);
  });
  carousel.appendChild(projectBox);
  carousel.appendChild(projectSkillBox);
  carousel.appendChild(titleBox);
  return carousel;
};

//? 캐러셀 1st child
const createInputs = () => Object.keys(data).map(createInput);
const createInput = (_, labelIndex) => {
  const inputId = `item-${labelIndex + 1}`;
  const hasActiveClass = (label) => label.classList.contains("active");
  const handleClick = () => {
    const label = findLabelByInputId(inputId);
    const projectId = label.id;
    const projectData = data[projectId];
    hasActiveClass(label) && startProject(projectData);
  };

  const handleChange = () => {
    const label = findLabelByInputId(inputId);
    const projectTitle = label.id;
    const projectData = data[projectTitle];
    const describeElement = document.querySelector(".project__describe");
    const titleElement = document.querySelector(
      ".project-content__carousel__title-box__title"
    );
    const projectDescribe = projectData.describe;
    titleElement.textContent = projectTitle;
    describeElement.textContent = projectDescribe;

    play(SELECT_SOUND);
    setInputIndex(labelIndex);
    refreshLabelClasses(labelIndex);
    changeSkillBox(projectData);
  };

  return createElement("input", {
    type: "radio",
    name: "slider",
    id: inputId,
    onClick: [handleClick],
    onChange: [handleChange],
  });
};

//? 캐러셀 2nd child
const createCarouselCards = (inputs) => {
  const box = createElement("div", {
    class: "project-content__carousel__cards",
  });
  const labels = createLabels(inputs);
  labels.map((label) => box.appendChild(label));
  return box;
};

const createLabels = (inputs) => inputs.map(createLabel);
const createLabel = (input, index) => {
  const projectTitle = PROJECT_ID_LIST[index];
  const labelElement = createElement("label", {
    class: "project-content__carousel__card focusable",
    for: input.id,
    id: projectTitle,
    tabIndex: 0,
  });
  const imgElement = createElement("img", {
    class: "project-content__carousel__card__image",
    src: data[projectTitle].backgroundImage,
    alt: "project image",
  });

  labelElement.appendChild(imgElement);
  return labelElement;
};

//? 캐러셀 3rd child
const createSkillBox = (projectData) => {
  const skillList = createElement("ul", {
    class: "project-content__overview__skill",
  });
  const skillItems = createSkillItems(projectData);
  skillItems.map((skillItem) => skillList.appendChild(skillItem));
  return skillList;
};

const changeSkillBox = (projectData) => {
  const skillList = document.querySelector(".project-content__overview__skill");
  skillList.innerHTML = "";
  const skillItems = createSkillItems(projectData);
  skillItems.map((skillItem) => skillList.appendChild(skillItem));
};

const createSkillItems = (projectData) => {
  const skills = projectData.skillOverview;
  return skills.map(createSkillItem);
};

const createSkillItem = (textContent) => {
  return createElement("li", {
    class: "project-content__overview__skill__item",
    textContent,
  });
};

//? 캐러셀 4th child
const createTitleBox = (projectTitle) => {
  const handleClick = () => {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((i) => {
      i.checked && i.click();
    });
  };

  const titleBox = createElement("div", {
    class: "project-content__carousel__title-box",
  });
  const prevButton = createElement("button", {
    class: "project-content__carousel__title-box__prev",
    textContent: "←",
    onClick: [prevProject],
  });
  const titleElement = createElement("p", {
    class: "project-content__carousel__title-box__title",
    textContent: projectTitle,
    onClick: [handleClick],
  });
  const nextButton = createElement("button", {
    class: "project-content__carousel__title-box__next",
    textContent: "→",
    onClick: [nextProject],
  });
  titleBox.appendChild(prevButton);
  titleBox.appendChild(titleElement);
  titleBox.appendChild(nextButton);
  return titleBox;
};

//? 그 외 유틸
const findLabelByInputId = (id) => document.querySelector(`label[for=${id}]`);

const refreshLabelClasses = (labelIndex) => {
  const prevIndex = labelIndex - 1 < 0 ? LIST_LENGTH - 1 : labelIndex - 1;
  const nextIndex = labelIndex + 1 >= LIST_LENGTH ? 0 : labelIndex + 1;
  labelList().forEach((label, index) => {
    label.classList.remove("prev");
    label.classList.remove("active");
    label.classList.remove("next");
    switch (index) {
      case prevIndex:
        label.classList.add("prev");
        break;
      case labelIndex:
        label.classList.add("active");
        break;
      case nextIndex:
        label.classList.add("next");
        break;
      default:
        break;
    }
  });
};

const startProject = (projectData) => {
  play(START_SOUND);
  Loading("Hamelln");
  setTimeout(() => {
    Project(projectData);
  }, 1000);
};

const fireChangeEvent = () => {
  const input = inputList()[inputIndex];
  input.checked = true;
  input.dispatchEvent(new Event("change"));
};

const setInputIndex = (currentIndex) => {
  if (currentIndex < 0) inputIndex = LIST_LENGTH + currentIndex;
  else if (currentIndex >= LIST_LENGTH) inputIndex = currentIndex % LIST_LENGTH;
  else inputIndex = currentIndex;
};

const nextProject = () => {
  setInputIndex(inputIndex + 1);
  fireChangeEvent();
};

const prevProject = () => {
  setInputIndex(inputIndex - 1);
  fireChangeEvent();
};

const addTouchCarousel = (carousel) => {
  let beginX;
  let distance;
  carousel.addEventListener("touchstart", (e) => {
    beginX = e.touches[0].clientX;
    distance = 0;
  });
  carousel.addEventListener("touchmove", (e) => {
    const currentX = e.touches[0].clientX;
    distance = currentX - beginX;
  });
  carousel.addEventListener("touchend", () => {
    if (distance < 100 && distance > -100) return;
    if (distance >= 100) prevProject();
    else nextProject();
  });
};

const initializeInput = (title) => {
  const inputIdNumber = title
    ? PROJECT_ID_LIST.findIndex((projectTitle) => projectTitle === title) + 1
    : DEFAULT_INPUT_NUMBER;
  const inputId = `item-${inputIdNumber}`;
  const input = document.getElementById(inputId);
  input.checked = true;
  refreshLabelClasses(inputIdNumber - 1);
};

const render = (projectTitle) => {
  const parent = document.querySelector(".project-content");
  const describeElement = document.querySelector(".project__describe");
  const projectDescribe = data[projectTitle].describe;
  describeElement.textContent = projectDescribe;
  const carousel = createCarousel(projectTitle);
  parent.innerHTML = "";
  parent.appendChild(carousel);
  addTouchCarousel(carousel);
};

const MobileSelection = (title) => {
  const projectTitle = title ? title : "Hamelln";
  render(projectTitle);
  initializeInput(projectTitle);
};

export default MobileSelection;
