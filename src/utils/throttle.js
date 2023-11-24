const throttle = (callback, delay = 400) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) return;
    timeoutId = setTimeout(() => {
      callback(...args);
      timeoutId = null;
    }, delay);
  };
};

export default throttle;
