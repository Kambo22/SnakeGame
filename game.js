
const canvas = document.getElementById('snakeCanvas');
const ctx = canvas.getContext('2d');

const boxSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let score = 0;
let gameStarted = false;
let gameInterval;
let direction = 'right'; 

const bombs = []; 

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  snake.forEach(drawSnakeSegment);

  ctx.fillStyle = 'red';
  drawFood();

  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  drawScore();
}

function update() {
  const head = Object.assign({}, snake[0]);

  switch (direction) {
    case 'up':
      head.y--;
      break;
    case 'down':
      head.y++;
      break;
    case 'left':
      head.x--;
      break;
    case 'right':
      head.x++;
      break;
  }

  if (
    head.x < 0 ||
    head.x >= canvas.width / boxSize ||
    head.y < 0 ||
    head.y >= canvas.height / boxSize
  ) {
    gameOver();
    return;
  }

  if (collision(head, snake)) {
    gameOver();
    return;
  }

  if (collision(head, bombs)) {
    gameOver();
    return;
  }

  snake.unshift(head);

  if (collision(head, [food])) {
    snake.unshift(food);
    spawnFood();
    score += 1;

    if (snake.length === canvas.width / boxSize * canvas.height / boxSize) {
      alert('Congratulations! You filled the entire playing area!');
      resetGame();
      return;
    }
  } else {
    snake.pop();
  }
}

function collision(obj1, obj2) {
  return obj2.some(function (segment) {
    return segment.x === obj1.x && segment.y === obj1.y;
  });
}

function spawnFood() {
  food = {
    x: Math.floor(Math.random() * (canvas.width / boxSize)),
    y: Math.floor(Math.random() * (canvas.height / boxSize))
  };
}

function gameLoop() {
  update();
  draw();
}

function startGame() {
  spawnFood();
  gameInterval = setInterval(gameLoop, 300);
}

function resetGame() {
  clearInterval(gameInterval);
  gameInterval = null;
  gameStarted = false;
  snake = [{ x: 10, y: 10 }];
  score = 0;
  bombs.length = 0;
}

function drawSnakeSegment(segment) {
  ctx.fillRect(segment.x * boxSize, segment.y * boxSize, boxSize, boxSize);
}

function drawFood() {
  ctx.fillRect(food.x * boxSize, food.y * boxSize, boxSize, boxSize);
}

function drawScore() {
  ctx.fillText('Score: ' + score, 10, 20);
}

function gameOver() {
  clearInterval(gameInterval);
  gameInterval = null;
  gameStarted = false;
  alert('Game Over!');
}

function gameOver() {
    clearInterval(gameInterval);
    gameInterval = null;
    gameStarted = false;
    alert('Game Over!');
    resetGame();
  }

document.addEventListener('keydown', function (event) {
  if (!gameStarted) {
    startGame();
    gameStarted = true;
  }

  switch (event.key) {
    case 'ArrowUp':
      direction = 'up';
      break;
    case 'ArrowDown':
      direction = 'down';
      break;
    case 'ArrowLeft':
      direction = 'left';
      break;
    case 'ArrowRight':
      direction = 'right';
      break;
  }
});