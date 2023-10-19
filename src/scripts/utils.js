export function formatTimeWithoutMinutes(time) {
  const [minutes, rest] = time.split(":");
  const [seconds, tenths] = rest.split(".");
  let formattedTime = `${seconds}.${tenths}`;

  if (minutes !== "00") {
    formattedTime = `${minutes}:${formattedTime}`;
  }

  return formattedTime;
}

export function objectToArray(object) {
  const tempos = object.map(registro => registro.time);
  return tempos;
}

export function timeToDate(time) {
  const timeInMiliseconds = time * 1000;
  return timeInMiliseconds;
}

export function dateToTime(time) {
  // create a function that recives a Date() and transform to this format: 00.22
  const tenths = time/1000;

  console.log(tenths);
}