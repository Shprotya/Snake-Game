let reset = document.getElementById('reset');
// Plying field
let boxSize = 25,
  rows = 18,
  cols = 18;
let playingFields;
let ctx;

// Snake coordinates
let snakeX = boxSize * 2;
let snakeY = boxSize * 3;

// Snake speed
let speedX = 0;
let speedY = 0;

// Food
let foodX;// = boxSize * 5;
let foodY;// = boxSize * 10;

// Body
let snakeBody = [];

// GameOver
let gameOver = false;

window.onload = function () {
  playingFields = document.getElementById('playingFields');
  playingFields.width = cols * boxSize;
  playingFields.height = rows * boxSize;
  ctx = playingFields.getContext("2d");

  placeFood();
  document.addEventListener('keyup', changeDirection);
  reset.addEventListener('click', function () {
    gameOver = false;
    snakeX = boxSize * 8;
    snakeY = boxSize * 8;
    speedX = 0;
    speedY = 0;
  })
  // update();
  setInterval(update, 1000 / 5);
}

function update() {
  if (gameOver) {
    return;
  }
  clear();

  ctx.fillStyle = "yellow";
  ctx.fillRect(foodX, foodY, boxSize, boxSize);

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i-1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  snakeX += speedX * boxSize;
  snakeY += speedY * boxSize;

  ctx.fillStyle = "lime";
  ctx.fillRect(snakeX, snakeY, boxSize, boxSize);
  for (let i = 0; i < snakeBody.length; i++){
    ctx.fillRect(snakeBody[i][0], snakeBody[i][1], boxSize, boxSize);
  }

  if (snakeX < 0 || snakeX > (cols - 1) * boxSize || snakeY < 0 || snakeY > (rows - 1) * boxSize) {
    gameOver = true;
    alert("Game Over woll");
  }

  for (let i = 0; i < snakeBody.length; i++){
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
    alert("Game Over Body");
    }
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * boxSize;
  foodY = Math.floor(Math.random() * rows) * boxSize;
}

function changeDirection(e) {
  console.log(e.code);
  if (e.code == "ArrowUp" && speedY != 1) {
    speedX = 0;
    speedY = -1;
  } else if (e.code == "ArrowDown" && speedY != -1) {
    speedX = 0;
    speedY = 1;
  } else if (e.code == "ArrowLeft" && speedX != 1) {
    speedX = -1;
    speedY = 0;
  } else if (e.code == "ArrowRight" && speedX != -1) {
    speedX = 1;
    speedY = 0;
  }
}

function clear() {
  ctx.clearRect(0, 0, playingFields.width, playingFields.height);
}

