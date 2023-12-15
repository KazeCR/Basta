let timer = 60; // Tiempo en segundos
let currentLetter = '';
let countdownInterval; // Variable para almacenar el intervalo del temporizador
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
    startCountdown();
  }
}

function startCountdown() {
  countdownInterval = setInterval(() => {
    timer--;
    document.getElementById('timer').innerText = `Tiempo restante: ${timer} segundos`;

    if (timer === 0) {
      handleBasta();
    }
  }, 1000);
}

function handleBasta() {
  const inputs = document.querySelectorAll('input[type="text"]');
  let validWords = [];

  inputs.forEach(input => {
    if (input.value.toLowerCase().startsWith(currentLetter.toLowerCase())) {
      validWords.push(input.value);
    }
    if (input.value === '' && timer > 0) {
      input.disabled = false; // Habilitar campos vacíos si todavía hay tiempo
    } else {
      input.disabled = true;
    }
  });

  const result = document.getElementById('result');
  if ((validWords.length === inputs.length || timer === 0) && timer !== 0) {
    clearInterval(countdownInterval); // Detener el temporizador
    result.innerText = `¡Todas las categorias están llenas! ¡Palabras válidas: ${validWords.join(', ')}!`;
    document.getElementById('resetButton').style.display = 'block';
    document.getElementById('bastaButton').disabled = true;
  } else if (timer === 0) {
    result.innerText = `Tiempo agotado. ¡Palabras válidas: ${validWords.join(', ')}!`;
    document.getElementById('resetButton').style.display = 'block';
    document.getElementById('bastaButton').disabled = true;
  } else {
    result.innerText = '¡Faltan categorias por llenar!';
  }
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

function getRandomLetter() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
}

