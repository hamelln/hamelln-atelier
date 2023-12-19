"use strict";

import isMobile from "./handlers/mobile-recognizer.js";

if (isMobile() && !location.href.includes("mobile")) {
  location.href = "/mobile.html";
}

if (!isMobile() && !location.href.includes("desktop")) {
  location.href = "/desktop.html";
}

window.addEventListener("resize", () => {
  if (isMobile() && location.href.includes("desktop")) {
    location.href = "/mobile.html";
  }
  if (!isMobile() && location.href.includes("mobile")) {
    location.href = "/desktop.html";
  }
});
