"use strict";

import isMobile from "../handlers/mobile-recognizer.js";
import MobileSelection from "./MobileSelection.js";
import Selection from "./Selection.js";

const renderSelection = (title) => {
  (isMobile() ? MobileSelection : Selection)(title);
};

export default renderSelection;
