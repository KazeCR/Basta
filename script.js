let timer = 60; // Tiempo en segundos
let currentLetter = '';
let gameStarted = false;

function startGame() {
  if (!gameStarted) {
    gameStarted = true;

    document.getElementById('startButton').disabled = true;
    document.getElementById('bastaButton').disabled = false;
    document.getElementById('resetButton').style.display = 'none';

    currentLetter = getRandomLetter();
    document.getElementById('letter').innerText = `Letra: ${currentLetter}`;
    document.getElementById('timer').innerText = `Tiempo restante: ${timer} segundos`;

    resetInputs();
    countdown();
  }
}

function countdown() {
  const countdownInterval = setInterval(() => {
    timer--;
    document.getElementById('timer').innerText = `Tiempo restante: ${timer} segundos`;

    if (timer === 0) {
      clearInterval(countdownInterval);
      endGame();
    }
  }, 1000);
}

function checkWords() {
  const inputs = document.querySelectorAll('input[type="text"]');
  let validWords = [];

  inputs.forEach(input => {
    if (input.value.toLowerCase().startsWith(currentLetter.toLowerCase())) {
      validWords.push(input.value);
    }
    input.disabled = true;
  });

  const result = document.getElementById('result');
  if (validWords.length === inputs.length) {
    result.innerText = `¡Todas las categorias estan llenas! ¡Palabras validas: ${validWords.join(', ')}!`;
    document.getElementById('resetButton').style.display = 'block';
  } else {
    result.innerText = '¡Faltan categorias por llenar!';
  }

  document.getElementById('bastaButton').disabled = true;
}

function resetGame() {
  resetInputs();
  document.getElementById('result').innerText = '';
  document.getElementById('startButton').disabled = false;
  gameStarted = false;
  timer = 60;
}

function resetInputs() {
  const inputs = document.querySelectorAll('input[type="text"]');
  inputs.forEach(input => {
    input.value = '';
    input.disabled = false;
  });
}

function endGame() {
  document.getElementById('bastaButton').disabled = true;
  document.getElementById('resetButton').style.display = 'block';
}

function getRandomLetter() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
}
