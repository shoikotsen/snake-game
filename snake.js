const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const snakeHeadImg = new Image();
snakeHeadImg.src = "assets/snake-head.png";
const snakeBodyImg = new Image();
snakeBodyImg.src = "assets/snake-body.png";
const mouseImg = new Image();
mouseImg.src = "assets/mouse.png";

let snake, food, direction, gameInterval, score, isGameOver;

function startGame() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-container").style.display = "flex";

    snake = [{ x: 300, y: 300 }];
    food = getRandomFoodPosition();
    direction = "RIGHT";
    score = 0;
    isGameOver = false;
    clearInterval(gameInterval);
    gameInterval = setInterval(updateGame, 150);
}

function updateGame() {
    if (isGameOver) return;

    let head = { ...snake[0] };
    if (direction === "UP") head.y -= 20;
    if (direction === "DOWN") head.y += 20;
    if (direction === "LEFT") head.x -= 20;
    if (direction === "RIGHT") head.x += 20;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById("score").innerText = `Score: ${score}`;
        food = getRandomFoodPosition();
    } else {
        snake.pop();
    }

    if (
        head.x < 0 || head.x >= canvas.width ||
        head.y < 0 || head.y >= canvas.height ||
        snake.slice(1).some(seg => seg.x === head.x && seg.y === head.y)
    ) {
        endGame();
    }

    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.forEach((seg, idx) => {
        if (idx === 0) {
            ctx.drawImage(snakeHeadImg, seg.x, seg.y, 20, 20);
        } else {
            ctx.drawImage(snakeBodyImg, seg.x, seg.y, 20, 20);
        }
    });
    ctx.drawImage(mouseImg, food.x, food.y, 20, 20);
}

function endGame() {
    isGameOver = true;
    clearInterval(gameInterval);
    alert(`Game Over! Your Score: ${score}`);
}

function restartGame() {
    startGame();
}

document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

function getRandomFoodPosition() {
    const x = Math.floor(Math.random() * 30) * 20;
    const y = Math.floor(Math.random() * 30) * 20;
    return { x, y };
}
