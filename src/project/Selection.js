import addClickAndEnterHandler from "../handlers/click-enter-handler.js";
import addKeyboardController from "../controllers/keyboard-controller.js";
import {
  addBlurHandler,
  addFocus,
  addFocusHandler,
  removeFocus,
} from "../handlers/focus-handler.js";
import { play } from "../handlers/sound-handler.js";
import Project from "./Project.js";
import Loading from "./Loading.js";
import createElement from "../handlers/element-creater.js";

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

const createSelectionBox = (selectionList) => {
  const selectionBox = createElement("div", {
    class: "project-content__selection",
  });
  const selectionTitle = createElement("h2", {
    class: "project-content__selection__title",
    textContent: "Project Select",
  });

  selectionBox.appendChild(selectionTitle);
  selectionBox.appendChild(selectionList);
  return selectionBox;
};

const createProjectList = () => {
  const projectTitles = Object.keys(data);
  const projectList = createElement("ul", {
    class: "project-content__selection__list",
  });

  projectTitles.map((projectTitle) => {
    const projectItem = createElement("li", {
      class: "project-content__selection__item focusable",
      tabIndex: 0,
      textContent: projectTitle,
    });
    projectList.appendChild(projectItem);
  });
  return projectList;
};

const createProjectFigure = () => {
  const figure = createElement("figure", {
    class: "project-content__overview",
  });
  const projectImg = createElement("img", {
    class: "project-content__overview__image",
  });
  const projectSkill = createElement("ul", {
    class: "project-content__overview__skill",
  });

  figure.appendChild(projectImg);
  figure.appendChild(projectSkill);
  return figure;
};

const addEventProjectItem = (project) => {
  const projectTitle = project.textContent.trim();
  const projectData = data[projectTitle];
  const projectSkillArray = projectData.skillOverview;
  const selectSound = document.querySelector("#project-sound");
  const startSound = document.querySelector("#game-start");
  const describe = document.querySelector(".project__describe");
  const projectSkillList = document.querySelector(
    ".project-content__overview__skill"
  );

  const setProjectImage = (projectTitle) => {
    const oldImg = document.querySelector(".project-content__overview__image");
    const parent = oldImg.parentNode;
    const newImg = createElement("img", {
      class: "project-content__overview__image",
      src: data[projectTitle].backgroundImage,
      alt: `${projectTitle} image`,
    });
    parent.replaceChild(newImg, oldImg);
  };

  const clearProjectImage = () => {
    const oldImg = document.querySelector(".project-content__overview__image");
    const parent = oldImg.parentNode;
    const newImg = oldImg.cloneNode();
    newImg.classList.add("blink");
    parent.replaceChild(newImg, oldImg);
    setTimeout(() => {
      newImg.src = "";
      newImg.alt = "";
    }, 300);
  };

  const startProject = () => {
    play(startSound);
    Loading("Hamelln");
    setTimeout(() => {
      Project(projectData);
    }, 1000);
  };

  const handleFocus = () => {
    describe.textContent = projectData.describe;
    projectSkillArray.map((skill) => {
      const projectSkillItem = createElement("li", {
        class: "project-content__overview__skill__item",
        textContent: skill,
      });
      projectSkillList.appendChild(projectSkillItem);
      setProjectImage(projectTitle);
    });
    play(selectSound);
  };

  const handleBlur = () => {
    describe.textContent = "";
    projectSkillList.innerHTML = "";
    clearProjectImage();
  };
  const handleHover = () => {
    removeFocus(document.activeElement);
    handleFocus();
  };
  //? 마우스 모드: 다른 곳에 focus 아이템이 있으면 focus 제거하고 이벤트만 실행
  project.addEventListener("mouseover", handleHover);
  project.addEventListener("mouseout", handleBlur);
  //? 키보드 모드: focusing도 처리해서 자동 스크롤 조절 기능 주입
  addFocusHandler(project)(handleFocus);
  addBlurHandler(project)(handleBlur);
  addClickAndEnterHandler(project)(startProject);
};

const findPrevFocusItem = (className, textContent) => {
  const items = Array.from(document.querySelectorAll(className));
  return items.find((item) => item.textContent.trim() === textContent);
};

const focusPrevItem = (projectTitle) => {
  if (!projectTitle) return;
  const focusedItem = findPrevFocusItem(
    ".project-content__selection__item",
    projectTitle
  );
  addFocus(focusedItem);
};

const render = (parent, projectTitle) => {
  const selectionList = createProjectList();
  const selectionBox = createSelectionBox(selectionList);
  const projectFigure = createProjectFigure();

  parent.innerHTML = "";
  parent.appendChild(selectionBox);
  parent.appendChild(projectFigure);

  selectionList.childNodes.forEach((project) => {
    addEventProjectItem(project, projectTitle);
  });

  addKeyboardController();
  focusPrevItem(projectTitle);
};

export default function Selection(title = undefined) {
  const parent = document.querySelector(".project-content");
  render(parent, title);
}
