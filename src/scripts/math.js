import { formatTimeWithoutMinutes, timeToDate } from "./utils.js";

export function calculateAo5(arrayTimes) {
  let arrayInDate = [];

  if (arrayTimes.length < 5) {
    return "The array needs to have at least 5 records";
  }

  arrayTimes.forEach(function (unit) {
    let formattedTime = formatTimeWithoutMinutes(unit);
    let timeInDate = timeToDate(formattedTime);
    arrayInDate.push(timeInDate);
  });

  arrayInDate = arrayInDate.slice(-5);
  arrayInDate.sort(function (a, b) {
    return a - b;
  });

  arrayInDate = arrayInDate.slice(1, -1);
  var sum = arrayInDate.reduce(function (total, time) {
    return total + time;
  }, 0);

  var average = sum / arrayInDate.length;

  return average;
}

export function calculateAo12(arrayTimes) {
  let arrayInDate = [];

  if (arrayTimes.length < 12) {
    return "The array needs to have at least 12 records";
  }

  arrayTimes.forEach(function (unit) {
    let formattedTime = formatTimeWithoutMinutes(unit);
    let timeInDate = timeToDate(formattedTime);
    arrayInDate.push(timeInDate);
  });

  arrayInDate = arrayInDate.slice(-12);
  arrayInDate.sort(function (a, b) {
    return a - b;
  });

  arrayInDate = arrayInDate.slice(1, -1);
  var sum = arrayInDate.reduce(function (total, time) {
    return total + time;
  }, 0);

  var average = sum / arrayInDate.length;

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
