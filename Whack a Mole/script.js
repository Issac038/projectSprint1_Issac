// Prompt: Declare variables to track score, time, game interval, and mole position
let score = 0;
let timeLeft = 30;
let moleInterval;
let countdownInterval;
let currentMole = null;
let moleSpeed = 1000; // initial speed

// Prompt: Get DOM elements
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const finalScoreDisplay = document.getElementById('final-score');
const holes = document.querySelectorAll('.hole');
const gameOverScreen = document.getElementById('game-over');

// Prompt: Start game when Start button is clicked
document.getElementById('start-btn').addEventListener('click', startGame);
// Prompt: Reset game state
document.getElementById('reset-btn').addEventListener('click', resetGame);
// Prompt: Play again button shows Game Over state reset
document.getElementById('play-again').addEventListener('click', startGame);

// Prompt: Display mole randomly in a hole
function showMole() {
  if (currentMole !== null) {
    holes[currentMole].classList.remove('mole');
  }

  const index = Math.floor(Math.random() * holes.length);
  currentMole = index;
  holes[index].classList.add('mole');
}

// Prompt: Start the game with countdown and mole interval
function startGame() {
  resetGame();
  gameOverScreen.style.display = 'none';
  moleInterval = setInterval(showMole, moleSpeed);
  countdownInterval = setInterval(updateTimer, 1000);

  holes.forEach((hole, index) => {
    hole.addEventListener('click', () => {
      if (index === currentMole) {
        score++;
        scoreDisplay.textContent = score;
        holes[index].classList.remove('mole');
        currentMole = null;
      }
    });
  });
}

// Prompt: Decrease time every second and speed up mole every 10 seconds
function updateTimer() {
  timeLeft--;
  timeDisplay.textContent = timeLeft;

  if (timeLeft % 10 === 0 && moleSpeed > 400) {
    clearInterval(moleInterval);
    moleSpeed -= 200;
    moleInterval = setInterval(showMole, moleSpeed);
  }

  if (timeLeft <= 0) {
    clearInterval(moleInterval);
    clearInterval(countdownInterval);
    showGameOver();
  }
}

// Prompt: Reset all game values to defaults
function resetGame() {
  score = 0;
  timeLeft = 30;
  moleSpeed = 1000;
  currentMole = null;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;
  finalScoreDisplay.textContent = 0;
  gameOverScreen.style.display = 'none';
  holes.forEach(h => h.classList.remove('mole'));
}

// Prompt: Show Game Over screen with final score
function showGameOver() {
  finalScoreDisplay.textContent = score;
  gameOverScreen.style.display = 'block';
}

