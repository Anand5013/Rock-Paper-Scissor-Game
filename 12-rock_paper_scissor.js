let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

let isAutoPlay = false;

let intervalId;

updateScore();

//Event_Listener_Button

document.querySelector(".rock-btn").addEventListener("click", () => {
  playGame("rock");
});

document.querySelector(".paper-btn").addEventListener("click", () => {
  playGame("paper");
});

document.querySelector(".scissors-btn").addEventListener("click", () => {
  playGame("scissors");
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("rock");
  } else if (event.key === "p") {
    playGame("paper");
  } else if (event.key === "s") {
    playGame("scissors");
  } else if (event.key === "a") {
    autoPlay();
  } else if (event.key === "Backspace") {
    showConfirmation();
  }
});

document.querySelector(".js-autoplay").addEventListener("click", () => {
  autoPlay();
});

document.querySelector(".js-reset-btn").addEventListener("click", () => {
  showConfirmation();
});

function showConfirmation() {
  const resetConfirmElem = document.querySelector(".js-reset-confirmation");

  resetConfirmElem.innerHTML = `Are you sure you want to reset the score?<button class="js-reset-yes reset-yes-btn">Yes</button><button class="js-reset-no reset-no-btn">No</button>`;

  document.querySelector(".js-reset-yes").addEventListener("click", () => {
    resetScore();
    hideConfirmation();
  });

  document.querySelector(".js-reset-no").addEventListener("click", () => {
    hideConfirmation();
  });
}

function hideConfirmation() {
  document.querySelector(".js-reset-confirmation").innerHTML = "";
}

function autoPlay() {
  let playerMove = pickComputerMove();

  const autoPlayElem = document.querySelector(".js-autoplay");
  if (!isAutoPlay) {
    autoPlayElem.innerText = "Stop Play";

    intervalId = setInterval(() => {
      playGame(playerMove);
    }, 1000);

    isAutoPlay = true;
  } else {
    clearInterval(intervalId);
    isAutoPlay = false;
    autoPlayElem.innerText = "Auto Play";
  }
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  updateScore();

  document.querySelector(".js-result").innerHTML = "";
  document.querySelector(".js-details").innerHTML = "";
  localStorage.removeItem("score");
}

function updateScore() {
  const pElem = document.querySelector(".js-score");
  pElem.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = "";

  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose.";
    } else if (computerMove === "paper") {
      result = "You win.";
    } else if (computerMove === "scissors") {
      result = "Tie.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "scissors") {
      result = "You lose.";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You lose.";
    } else if (computerMove === "scissors") {
      result = "You win.";
    }
  }

  if (result === "You win.") {
    score.wins += 1;
  } else if (result === "You lose.") {
    score.losses += 1;
  } else if (result === "Tie.") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScore();

  document.querySelector(".js-result").innerHTML = `${result}`;

  document.querySelector(".js-details").innerHTML = `You
      <img class="move" src="pics/${playerMove}-emoji.png"/>
      <img class="move" src="pics/${computerMove}-emoji.png"/>
      Computer`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }

  return computerMove;
}
