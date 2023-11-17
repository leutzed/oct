import { generateNewScramble } from "./scrambles.js";
import { populateTableFromLocalStorage } from "./populateData.js";
// import { populateChart } from './stats.js'

import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

let inExecution = false;
let spacePressed = false;
let tenths = 0;
let seconds = 0;
let minutes = 0;
let interval;
let solvedScramble;
let timeoutId;
let isIntervalPassed = false;
let cancelTimer = false;

let startedAt = 0;
let endedAt = 0;

const elementTime = document.querySelector("#time");
const container = document.querySelector(".container");

solvedScramble = generateNewScramble();
populateTableFromLocalStorage();
// populateChart();

if (!inExecution) {
  document.addEventListener("keydown", handleKeyDown);
  container.addEventListener("touchstart", handleKeyDown);
}

function handleKeyDown(event) {
  if (event.code === "Space" || event.type === "touchstart") {
    cancelTimer = false;
    if (!spacePressed && !inExecution) {
      spacePressed = true;
      elementTime.classList.add('red');
      document.addEventListener("keyup", handleCancelTimer);
      container.addEventListener("touchend", handleCancelTimer);
      if (!cancelTimer) {
        timeoutId = setTimeout(() => {
          if (spacePressed && !inExecution) {
            isIntervalPassed = true;

            elementTime.textContent = "00:00.00";
            elementTime.classList.remove('red');
            elementTime.classList.add('green');

            document.addEventListener("keyup", handleKeyUp);
            container.addEventListener("touchend", handleKeyUp);
          }
        }, 300);
      }
    } else if (inExecution) {
      stopTimer();
      solvedScramble = generateNewScramble();
    }
  }
}

function handleCancelTimer(event) {
  if (!isIntervalPassed) {
    if (event.code === "Space" || event.type === "touchend") {
      if (spacePressed) {
        spacePressed = false;
        clearTimeout(timeoutId);
        elementTime.classList.remove('red');
        cancelTimer = true;
        elementTime.textContent = "00:00.00";
      }
    }
  }
  document.removeEventListener("keyup", handleCancelTimer);
}
 
function handleKeyUp(event) {
  document.removeEventListener("keyup", handleKeyUp);
  elementTime.classList.remove('green');
  if (event.code === "Space" || event.type === "touchend") {
    if (spacePressed) {
      spacePressed = false;
      startTimer();
      clearTimeout(timeoutId);
    }
  }
}

function formatTime() {
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}.${tenths.toString().padStart(2, "0")}`;
}

function startTimer() {
  startedAt = Date.now();
  if (!inExecution) {
    if (minutes !== 0 || seconds !== 0 || tenths !== 0) {
      resetTimer();
    }
    inExecution = true;
    interval = setInterval(function () {
      tenths++;
      if (tenths === 100) {
        tenths = 0;
        seconds++;
        if (seconds === 60) {
          seconds = 0;
          minutes++;
        }
      }
      elementTime.textContent = formatTime();
    }, 10);
  }
}

function stopTimer() {
  endedAt = Date.now();
  if (inExecution) {
    inExecution = false;
    isIntervalPassed = false;
    clearInterval(interval);

    let timeInMs = endedAt - startedAt

    const currentTime = formatTime();
    if (currentTime !== "00:00.00") {
      let timeRecords = JSON.parse(localStorage.getItem("times")) || [];
      let id = uuidv4();

      let thisScramble = getScramble(solvedScramble)

      console.log(thisScramble);
      console.log(solvedScramble);

      const timeRecord = {
        id: id,
        time: currentTime,
        timeInMs: timeInMs,
        scramble: thisScramble,
      };

      timeRecords.push(timeRecord);

      localStorage.setItem("times", JSON.stringify(timeRecords));
      populateTableFromLocalStorage();
      // populateChart();
    }
  }
}

async function getScramble(scramble) {
  let newScramble = await scramble;
  return newScramble;
}

function resetTimer() {
  inExecution = false;
  clearInterval(interval);
  tenths = 0;
  seconds = 0;
  minutes = 0;
  elementTime.textContent = "00:00.00";
}