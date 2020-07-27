const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

(function chooseLetters() {
  var randLetters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','S','T','U','V','W','X','Y','Z']
  shuffle(randLetters)
  
  //On Match Display...../img/energy-efficiency/1c1").src = "../img/energy-efficiency/"+randLetters[0]+".svg"
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
})();

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

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
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  //Set modal img
  document.getElementById("match").src = firstCard.dataset.src
  modal.style.display = "block";
  
  // Close when click x
  span.onclick = function() {
    modal.style.display = "none";
  }
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));


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

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}