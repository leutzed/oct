const scrambleView = document.querySelector("#scramble-display")
const scrambleText = document.querySelector("#scramble-text")
console.log(scrambleText)

function getRandomMove(previousMove) {
  const allMoves = ['R', 'U', 'F', 'D', 'B', 'L'];
  const variations = ['', '\'', '2'];

  // Gere um movimento aleatório
  let randomMove = '';
  let randomVariation = '';

  do {
    randomMove = allMoves[Math.floor(Math.random() * allMoves.length)];
    randomVariation = variations[Math.floor(Math.random() * variations.length)];
    randomMove += randomVariation;
  } while (randomMove === previousMove || randomMove[0] === previousMove[0]);

  return randomMove;
}

function generateRandomSequence() {
  const sequence = [];
  let previousMove = '';

  for (let i = 0; i < 20; i++) {
    const randomMove = getRandomMove(previousMove);
    sequence.push(randomMove);
    previousMove = randomMove;
  }

  return sequence;
}

const sequence = generateRandomSequence();
strSequence = sequence.join(' ');

scrambleView.attributes[1].value = strSequence;
scrambleText.textContent = strSequence;
