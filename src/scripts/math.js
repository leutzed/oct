import { formatTimeWithoutMinutes, timeToDate } from "./utils.js";

export function calculateAo5 (times) {
  // console.log(times);
  if (times.length < 5) {
    return "The array needs to have at least 5 records";
  }

  let timesInMs = times.map(unit => unit.timeInMs);

  timesInMs = timesInMs.slice(-5);
  timesInMs.sort(function (a, b) {
    return a - b;
  });

  timesInMs = timesInMs.slice(1, -1);
  var sum = timesInMs.reduce(function (total, time) {
    return total + time;
  }, 0);

  var average = sum / timesInMs.length;

  return average;
}

export function calculateAo12(times) {
  if (times.length < 12) {
    return "The array needs to have at least 12 records";
  }

  let timesInMs = times.map(unit => unit.timeInMs);

  timesInMs = timesInMs.slice(-12);
  timesInMs.sort(function (a, b) {
    return a - b;
  });

  timesInMs = timesInMs.slice(1, -1);
  var sum = timesInMs.reduce(function (total, time) {
    return total + time;
  }, 0);

  var average = sum / timesInMs.length;

  return average;
}

export function totalOfSolves(arrayTimes) {
  return arrayTimes.length;
}

export function getBestSolve(arrayTimes) {
  let arrayInDate = [];

  arrayTimes.forEach(function (unit) {
    let formattedTime = formatTimeWithoutMinutes(unit);
    let timeInDate = timeToDate(formattedTime);
    arrayInDate.push(timeInDate);
  });

  arrayInDate.sort(function (a, b) {
    return b - a;
  });

  arrayInDate = arrayInDate.slice(-1);

  return arrayInDate[0];
}
