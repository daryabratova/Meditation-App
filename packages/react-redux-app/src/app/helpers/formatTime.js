export const formatTime = (seconds) => {
  const parts = [seconds % 60, seconds / 60];

  return parts
    .reverse()
    .map((part) => String(Math.floor(part)).padStart(2, '0'))
    .join(':');
};
