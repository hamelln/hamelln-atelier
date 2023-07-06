const addKeyboardNavigationWithScroll = () => {
  const focusableNodes = document.querySelectorAll(".focusable");
  const focusableArray = Array.from(focusableNodes);

  const addFocus = (node) => {
    node.classList.add("focus");
    node.focus();
  };

  const removeFocus = (node) => {
    node.classList.remove("focus");
  };

  const navigateNodes = (event) => {
    const currentIndex = focusableArray.findIndex(
      (node) => node === document.activeElement
    );
    let nextIndex = -1;

    event.preventDefault();

    switch (event.key) {
      case "ArrowUp":
        nextIndex = currentIndex - 1;
        break;
      case "ArrowDown":
        nextIndex = currentIndex + 1;
        break;
      case "ArrowLeft":
        nextIndex = currentIndex - 1;
        break;
      case "ArrowRight":
        nextIndex = currentIndex + 1;
        break;
      case "Tab":
        nextIndex = currentIndex + 1;
        break;
      default:
        return;
    }

    if (nextIndex < 0) {
      nextIndex = focusableArray.length - 1;
    } else if (nextIndex >= focusableArray.length) {
      nextIndex = 0;
    }
    removeFocus(focusableArray[currentIndex]);
    const nextNode = focusableArray[nextIndex];
    addFocus(nextNode);
    const parentSection = nextNode.closest("section");
    parentSection?.scrollIntoView({ block: "nearest" });
  };

  focusableNodes.forEach((node) => {
    node.addEventListener("mousemove", () => {
      addFocus(node);
    });
    node.addEventListener("mouseleave", () => {
      removeFocus(node);
    });
    node.addEventListener("focus", () => {
      addFocus(node);
    });
    node.addEventListener("blur", () => {
      removeFocus(node);
    });
    node.addEventListener("keydown", navigateNodes);
  });
};

export default addKeyboardNavigationWithScroll;
