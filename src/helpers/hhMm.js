function checkTime(i) {
  if (i < 10) {
    i = `0${i}`;
  }
  return i;
}

export default function toHhMm(string) {
  const today = new Date(string * 1000);
  // let h = today.getHours();
  // let m = today.getMinutes();
  console.log(string);

  return today.toLocaleTimeString();
}
