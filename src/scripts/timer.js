import { generateNewScramble } from "./scrambles.js";
import { populateTableFromLocalStorage } from "./populateData.js";

let inExecution = false;
let spacePressed = false;
let tenths = 0;
let seconds = 0;
let minutes = 0;
let timeRecords = [];
let interval;
let solvedScramble;
let timeoutId;

const elementTime = document.querySelector("#tempo");

solvedScramble = generateNewScramble();
populateTableFromLocalStorage();
document.addEventListener("keydown", handleKeyDown);

function handleKeyDown(event) {
  if (event.code === "Space") {
    if (!spacePressed && !inExecution) {
      spacePressed = true;
      console.log(spacePressed);
      timeoutId = setTimeout(() => {
        if (spacePressed) {
          document.addEventListener("keyup", handleKeyUp);
        }
      }, 1000);
    } else if (inExecution) {
      stopTimer();
    }
  }
}
 
function handleKeyUp(event) {
  console.log('sortou');
  if (event.code === "Space") {
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
  if (inExecution) {
    inExecution = false;
    clearInterval(interval);

    let id = timeRecords.length + 1;

    const currentTime = formatTime();
    if (currentTime !== "00:00.00") {
      let timeRecords = JSON.parse(localStorage.getItem("times")) || [];

      const timeRecord = {
        id: id,
        time: currentTime,
        scramble: solvedScramble,
      };

      timeRecords.push(timeRecord);

      localStorage.setItem("times", JSON.stringify(timeRecords));
      populateTableFromLocalStorage();
    }
  }
}

function resetTimer() {
  inExecution = false;
  clearInterval(interval);
  tenths = 0;
  seconds = 0;
  minutes = 0;
  elementTime.textContent = "00:00.00";
}