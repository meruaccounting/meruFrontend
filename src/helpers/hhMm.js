function checkTime(i) {
  if (i < 10) {
    i = `0${i}`;
  }
  return i;
}

export default function toHhMm(string) {
  const today = new Date(string);
  let h = today.getHours();
  let m = today.getMinutes();

  // add a zero in front of numbers<10
  h = checkTime(h);
  m = checkTime(m);
  return `${h}:${m}`;
}
