const numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
const cardNumbers = numbers.length;
let cards = null;
let play = true;
let firstCard = null;
let secondCard = null;
let matchedCount = 0;

function createCards() {
  const gameContainer = document.querySelector(".game-container");
  for (let i = 0; i < cardNumbers; i++) {
    const card = document.createElement("div");
    card.classList.add("game-card");
    gameContainer.appendChild(card);
  }
  cards = document.querySelectorAll(".game-card");
}

function shuffleNumbers() {
  for (let i = cardNumbers - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  cards.forEach((card, i) => {
    card.textContent = numbers[i];
  });
}

function flipCard() {
  cards.forEach((card) => {
    card.addEventListener("click", function () {
      if (play) {
        if (!this.classList.contains("show")) {
          this.classList.add("show");
          if (!firstCard) {
            firstCard = this;
          } else {
            secondCard = this;
            play = false;
            matchCards();
          }
        }
      }
    });
  });
}

function matchCards() {
  if (firstCard.textContent === secondCard.textContent) {
    matchedCount += 1;
    if (matchedCount === cardNumbers / 2) {
      setTimeout(() => {
        cards.forEach((card) => {
          card.classList.remove("show");
        });
        shuffleNumbers();
        matchedCount = 0;
        readyToFlip();
      }, 3000);
    } else {
      readyToFlip();
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove("show");
      secondCard.classList.remove("show");
      readyToFlip();
    }, 1500);
  }
}

function readyToFlip() {
  firstCard = null;
  secondCard = null;
  play = true;
}

createCards();
shuffleNumbers();
flipCard();
