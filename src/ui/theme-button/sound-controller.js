"use strict";

import { play, stop } from "../../handlers/sound-handler.js";

const handleSoundSign = (() => {
  const setup = () => {
    const morningSound = document.getElementById("morning-sound");
    const nightSound = document.getElementById("night-sound");
    const soundMap = new Map([
      [1, morningSound],
      [-1, nightSound],
    ]);
    return soundMap;
  };

  const sound = () => soundMap.get(soundSign);

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
