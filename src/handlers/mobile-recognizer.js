"use strict";

export default function isMobile() {
  const isSmallWidth = window.matchMedia(
    "only screen and (max-width: 767px)"
  ).matches;
  const isMobileDevice = /Mobi/i.test(navigator.userAgent);
  return isMobileDevice || isSmallWidth;
}
