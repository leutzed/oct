export function formatTimeWithoutMinutes(time) {
  const [minutes, rest] = time.split(":");
  const [seconds, tenths] = rest.split(".");
  let formattedTime = `${seconds}.${tenths}`;

  if (minutes !== "00") {
    formattedTime = `${minutes}:${formattedTime}`;
  }

  return formattedTime;
}