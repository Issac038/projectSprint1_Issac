// Initialize scores and round tracking
let playerScore = 0;
let computerScore = 0;
let round = 1;

// Randomly return one of Rock, Paper, or Scissors
function getComputerChoice() {
  const choices = ['Rock', 'Paper', 'Scissors'];
  return choices[Math.floor(Math.random() * choices.length)];
}

// Decide round result and update score
function playRound(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) return 'draw';
  if (
    (playerChoice === 'Rock' && computerChoice === 'Scissors') ||
    (playerChoice === 'Paper' && computerChoice === 'Rock') ||
    (playerChoice === 'Scissors' && computerChoice === 'Paper')
  ) {
    playerScore++;
    return 'win';
  } else {
    computerScore++;
    return 'lose';
  }
}

// Return emoji based on choice
function getIcon(choice) {
  if (choice === 'Rock') return '🪨';
  if (choice === 'Paper') return '📄';
  if (choice === 'Scissors') return '✂️';
  return '?';
}

// Update UI with new scores, round number, choices, and result
function updateUI(playerChoice, computerChoice, outcome) {
  document.getElementById('player-score').innerText = playerScore;
  document.getElementById('computer-score').innerText = computerScore;
  document.getElementById('round').innerText = Math.min(round, 5);
  document.getElementById('player-choice').innerText = getIcon(playerChoice);
  document.getElementById('computer-choice').innerText = getIcon(computerChoice);

  let resultText = '';
  if (round > 5) {
    if (playerScore > computerScore) resultText = "🎉 You win the game!";
    else if (playerScore < computerScore) resultText = "💻 Computer wins the game!";
    else resultText = "🤝 It's a tie!";
  } else {
    if (outcome === 'win') resultText = `✅ You win! ${playerChoice} beats ${computerChoice}`;
    else if (outcome === 'lose') resultText = `❌ You lose! ${computerChoice} beats ${playerChoice}`;
    else resultText = `🔄 It's a draw!`;
  }

  document.getElementById('result').innerText = resultText;
}

// Main handler for player choice, triggers round play
function handleChoice(playerChoice) {
  if (round > 5) return;
  const computerChoice = getComputerChoice();
  const result = playRound(playerChoice, computerChoice);
  updateUI(playerChoice, computerChoice, result);
  round++;
}

// Add click event listeners to choice buttons
document.getElementById('rock').addEventListener('click', () => handleChoice('Rock'));
document.getElementById('paper').addEventListener('click', () => handleChoice('Paper'));
document.getElementById('scissors').addEventListener('click', () => handleChoice('Scissors'));

// Reset game on reset button click
document.getElementById('reset').addEventListener('click', () => {
  playerScore = 0;
  computerScore = 0;
  round = 1;
  document.getElementById('player-choice').innerText = '?';
  document.getElementById('computer-choice').innerText = '?';
  document.getElementById('result').innerText = '';
  updateUI('', '', '');
});
