/* GAME FUNCTION: 
	- Player must guess a number between a min and max
	- Player get a certain amount of guesses
	- Notify player of guesses remaining
	- Notify the player of the correct answer if loose
	- Let player choose to play again
 */
// Game values
let min = 1,
  max = 15,
  winningNum = getRandomNum(min, max),
  guessesLeft = 4;

// UI Elems
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessInput = document.querySelector("#guess-input"),
  guessBtn = document.querySelector("#guess-btn"),
  message = document.querySelector(".message");

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Game event listener
game.addEventListener('mousedown', function(e) {
	if (e.target.classList.contains("play-again")) {
		window.location.reload();
	}
})

// Listen for guess
guessBtn.addEventListener("click", function() {
  let guess = parseInt(guessInput.value);
  // Validate guess
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}!`, "red");
  } else if (guess === winningNum) { // Check if won
    // Game over - won
    gameOver(true, `${winningNum} is correct, YOU WIN!`);
  } else {
    // Wrong number
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      // Game over - lost
      gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
		} else {
      // Game continues - answer wrong

      // Change  border color
      guessInput.style.borderColor = "red";
      // Clear input
      guessInput.value = "";
      // Tell user its wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, "red");
    }
  }
});

// Game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");
  // Disable input
  guessInput.disabled = true;
  // Change  border color
  guessInput.style.borderColor = color;
  // Change  border width
  guessInput.style.borderWidth = "2px";
  // Set message
	setMessage(msg, color);
	

	// Play again
	guessBtn.value = "Play Again";
	// Add class and space before class
	guessBtn.classList += " play-again";
}

// Get Random winning number
function getRandomNum(min, max) {
		return	Math.floor(Math.random() * (max - min) + min);
}
	// Set message
function setMessage(msg, color) {
  message.textContent = msg;
  message.style.color = color;
}
