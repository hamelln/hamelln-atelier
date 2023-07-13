export default function isMobile() {
  const isSmallWidth = window.matchMedia(
    "only screen and (max-width: 767px)"
  ).matches;
  const isMobileDevice = /Mobi/i.test(window.navigator.userAgent);
  return isSmallWidth || isMobileDevice;
}
