var gameArea = document.getElementById("game-area");
var player = document.getElementById("player");
var score = 0;

function moveUp() {
  var topPosition = window.getComputedStyle(player).getPropertyValue("top");
  if (player.style.top === "0px") {
    return;
  } else {
    var position = parseInt(topPosition);
    position -= 5;
    player.style.top = `${position}px`;
  }
}

function moveDown() {
  var topPosition = window.getComputedStyle(player).getPropertyValue("top");
  if (player.style.top === "450px") {
    return;
  } else {
    var position = parseInt(topPosition);
    position += 4;
    player.style.top = `${position}px`;
  }
}

function playerMove(event) {
  if (event.key === "ArrowUp") {
    event.preventDefault();
    moveUp();
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    moveDown();
  } else if (event.key === " ") {
    event.preventDefault();
    throwBall();
  }
}

function throwBall() {
  var ball = createBallElement();
  gameArea.appendChild(ball);
  moveBall(ball);
}

function createBallElement() {
  var xPosition = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
  var yPosition = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
  var newBall = document.createElement("div");
  newBall.classList.add("ball");
  newBall.style.left = `${xPosition}px`;
  newBall.style.top = `${yPosition}px`;
  return newBall;
}

function moveBall(ball) {
  setInterval(() => {
    var xPosition = parseInt(ball.style.left);
    var pets = document.querySelectorAll(".pet");
    pets.forEach(pet => {
      if (checkCollision(ball, pet)) {
        pet.remove();
        score += 1;
        if (score < 3) {
          createPet();
        } else {
          location.href = "/view";
        }
      }
    });
    if (xPosition >= 475) {
      ball.remove();
    } else {
      ball.style.left = `${xPosition + 4}px`;
    }
  }, 10);
}

function createPet() {
  var newPet = document.createElement("img");
  newPet.src = $("#game-area").attr("data-pet-image");
  newPet.classList.add("pet");
  newPet.style.left = "450px";
  newPet.style.top = `${Math.floor(Math.random() * 450)}px`;
  gameArea.appendChild(newPet);
}

function checkCollision(ball, pet) {
  var ballLeft = parseInt(ball.style.left);
  var ballTop = parseInt(ball.style.top);
  var petTop = parseInt(pet.style.top);
  var petBottom = petTop - 50;
  var petLeft = parseInt(pet.style.left);
  if (ballLeft !== 460 && ballLeft + 50 >= petLeft) {
    if (ballTop <= petTop && ballTop >= petBottom) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function playGame() {
  window.addEventListener("keydown", playerMove);
  createPet();
}

playGame();
