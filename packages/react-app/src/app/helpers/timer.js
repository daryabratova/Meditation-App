export const createTimer = () => {
  let timeInterval = 0;
  let callback = () => {};
  let isActive = false;
  let timePassed = 0;
  let timeStamp;
  let tickIntervalId;

  const tickFrequency = 200;

  const getTimePassedFromLastStamp = () => {
    return Math.floor((Date.now() - timeStamp) / 1000);
  };

  const setTimeInterval = (seconds) => {
    timeInterval = seconds;
  };

  const setCallback = (fn) => {
    callback = fn;
  };

  const start = () => {
    if (!isActive) {
      isActive = true;

      callback({
        timePassed,
        isFirst: timePassed === 0,
      });

      timeStamp = Date.now();

      tickIntervalId = setInterval(() => {
        const timePassedFromLastStamp = getTimePassedFromLastStamp();

        callback({
          timePassed: timePassed + timePassedFromLastStamp,
        });

        if (timePassed + timePassedFromLastStamp >= timeInterval) {
          reset();
        }
      }, tickFrequency);
    }
  };

  const pause = () => {
    if (isActive) {
      isActive = false;

      clearInterval(tickIntervalId);

      const timePassedFromLastStamp = getTimePassedFromLastStamp();

      timePassed = timePassed + timePassedFromLastStamp;

      callback({
        timePassed,
      });
    }
  };

  const reset = () => {
    isActive = false;

    clearInterval(tickIntervalId);

    timePassed = 0;

    callback({
      timePassed,
      isLast: true,
    });
  };

  return {
    setTimeInterval,
    setCallback,
    start,
    pause,
    reset,
  };
};
