const cards = document.querySelectorAll('.memory-card');
//Game
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
//Score
var matches = 0;
var misses = 0;
//SFX
var matchSound = new Audio("../sound/match.mp3");
var winSound = new Audio("../sound/win.mp3");
var flipSound = new Audio("../sound/flip.mp3");
var missSound = new Audio("../sound/miss.mp3");

function initialize() {
  chooseLetters();
  shuffleCards();
  cards.forEach(card => card.addEventListener('click', flipCard));
  openStartModal();
}

function chooseLetters() {
  var randLetters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','S','T','U','V','W','X','Y','Z']
  shuffle(randLetters)

  //On Match Display.....
  document.getElementById("m1c1").dataset.src = "../img/energy-efficiency/"+randLetters[0]+".png"
  document.getElementById("m1c2").dataset.src = "../img/energy-efficiency/"+randLetters[0]+".png"
  document.getElementById("m2c1").dataset.src = "../img/energy-efficiency/"+randLetters[1]+".png"
  document.getElementById("m2c2").dataset.src = "../img/energy-efficiency/"+randLetters[1]+".png"
  document.getElementById("m3c1").dataset.src = "../img/energy-efficiency/"+randLetters[2]+".png"
  document.getElementById("m3c2").dataset.src = "../img/energy-efficiency/"+randLetters[2]+".png"
  document.getElementById("m4c1").dataset.src = "../img/energy-efficiency/"+randLetters[3]+".png"
  document.getElementById("m4c2").dataset.src = "../img/energy-efficiency/"+randLetters[3]+".png"
  document.getElementById("m5c1").dataset.src = "../img/energy-efficiency/"+randLetters[4]+".png"
  document.getElementById("m5c2").dataset.src = "../img/energy-efficiency/"+randLetters[4]+".png"
  document.getElementById("m6c1").dataset.src = "../img/energy-efficiency/"+randLetters[5]+".png"
  document.getElementById("m6c2").dataset.src = "../img/energy-efficiency/"+randLetters[5]+".png"
  //On Flip Display...
  document.getElementById("m1c1f").src = "../img/alphabet/"+randLetters[0]+".svg"
  document.getElementById("m1c2f").src = "../img/alphabet/"+randLetters[0]+".svg"
  document.getElementById("m2c1f").src = "../img/alphabet/"+randLetters[1]+".svg"
  document.getElementById("m2c2f").src = "../img/alphabet/"+randLetters[1]+".svg"
  document.getElementById("m3c1f").src = "../img/alphabet/"+randLetters[2]+".svg"
  document.getElementById("m3c2f").src = "../img/alphabet/"+randLetters[2]+".svg"
  document.getElementById("m4c1f").src = "../img/alphabet/"+randLetters[3]+".svg"
  document.getElementById("m4c2f").src = "../img/alphabet/"+randLetters[3]+".svg"
  document.getElementById("m5c1f").src = "../img/alphabet/"+randLetters[4]+".svg"
  document.getElementById("m5c2f").src = "../img/alphabet/"+randLetters[4]+".svg"
  document.getElementById("m6c1f").src = "../img/alphabet/"+randLetters[5]+".svg"
  document.getElementById("m6c2f").src = "../img/alphabet/"+randLetters[5]+".svg"
}

function shuffleCards() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');
  flipSound.play();

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;
    
    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.src === secondCard.dataset.src;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  matches ++;
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  openMatchModal();
  resetBoard();
}

function unflipCards() {
  misses++;
  lockBoard = true;

  setTimeout(() => {
    missSound.play();
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function openStartModal() {
  //Set modal and content
  var modal = document.getElementById("startModal");
  var btn = document.getElementById("start-btn");
  modal.style.display = "block";
  // Close when click x
  btn.onclick = function() {
    modal.style.display = "none";
  }
}

function openMatchModal() {
  matchSound.play();
  //Set modal and content
  var modal = document.getElementById("matchModal");
  document.getElementById("match").src = firstCard.dataset.src;
  var span = document.getElementsByClassName("close")[0];
  modal.style.display = "block";
  // Close when click x
  span.onclick = function() {
    modal.style.display = "none";
      if(matches == 6) {openOverModal()}
  }
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      if(matches == 6) {openOverModal()}
    }
  }
}

function openOverModal() {
  winSound.play();
  //Set modal and content
  var modal = document.getElementById("overModal");
  var span = document.getElementsByClassName("close")[1];
  if (misses == 1) {
    document.getElementById("misses").innerHTML = "You made 6 matches with only 1 miss!";
  }
  else {
    document.getElementById("misses").innerHTML = "You made 6 matches with "+misses+" misses!";
  }
  modal.style.display = "block";
  // Close when click x
  span.onclick = function() {
    modal.style.display = "none";
  }

}