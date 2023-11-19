exports.secondsToMinutesAndSeconds = (decimalSeconds) => {
  if (!decimalSeconds) return '0:00';
  const flooredSeconds = Math.floor(decimalSeconds);
  const minutes = Math.floor(flooredSeconds / 60);
  const seconds = flooredSeconds - minutes * 60;
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}