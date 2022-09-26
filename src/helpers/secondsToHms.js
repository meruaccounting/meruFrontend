export default function secondsToHms(d) {
  if (Number.isNaN(d)) d = 0;
  const arr = new Date(d * 1000).toISOString().substring(11, 16).split(':');

  return `${arr[0]}h ${arr[1]}m`;
}
