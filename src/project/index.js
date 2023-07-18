import isMobile from "../utils/isMobile.js";
import MobileSelection from "./MobileSelection.js";
import Selection from "./Selection.js";

const renderSelection = (title) => {
  (isMobile() ? MobileSelection : Selection)(title);
};

export default renderSelection;
