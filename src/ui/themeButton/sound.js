"use strict";

const handleSoundSign = (() => {
  const setup = () => {
    const morningSound = document.getElementById("morning-sound");
    const nightSound = document.getElementById("night-sound");
    const soundMap = new Map();
    soundMap.set(1, morningSound);
    soundMap.set(-1, nightSound);
    return soundMap;
  };

  const sound = () => soundMap.get(soundSign);

  const play = (sound) => {
    sound.play();
  };

  const stop = (sound) => {
    sound.pause();
    sound.currentTime = 0;
  };

  const setSoundSign = (newSoundSign) => {
    if (soundSign !== newSoundSign) {
      stop(sound());
      soundSign = newSoundSign;
      play(sound());
    }
  };

  const handleSoundSign = () => {
    setSoundSign(-soundSign);
  };

  let soundSign = 1;
  const soundMap = setup();
  return handleSoundSign;
})();

export default handleSoundSign;
