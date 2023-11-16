import { randomScrambleForEvent } from "https://cdn.cubing.net/js/cubing/scramble";

const scrambleView = document.querySelector("#scramble-display")
const scrambleText = document.querySelector("#scramble-text")

export async function generateNewScramble() {
  const scramble = await randomScrambleForEvent("333");
  
  scrambleView.attributes[1].value = scramble;
  scrambleText.textContent = scramble;

  return scrambleText.textContent;
}