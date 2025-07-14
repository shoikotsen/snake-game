const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 🟣 Set grid size for snake and food (change this if needed)
const gridSize = 40;

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

    snake = [{ x: gridSize * 7, y: gridSize * 7 }]; // Start aligned to grid
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
    if (direction === "UP") head.y -= gridSize;
    if (direction === "DOWN") head.y += gridSize;
    if (direction === "LEFT") head.x -= gridSize;
    if (direction === "RIGHT") head.x += gridSize;

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
        try {
            if (idx === 0) {
                ctx.drawImage(snakeHeadImg, seg.x, seg.y, gridSize, gridSize);
            } else {
                ctx.drawImage(snakeBodyImg, seg.x, seg.y, gridSize, gridSize);
            }
        } catch (e) {
            ctx.fillStyle = idx === 0 ? "#4CAF50" : "#8BC34A";
            ctx.fillRect(seg.x, seg.y, gridSize, gridSize);
        }
    });
    try {
        ctx.drawImage(mouseImg, food.x, food.y, gridSize, gridSize);
    } catch (e) {
        ctx.fillStyle = "#FF5252";
        ctx.fillRect(food.x, food.y, gridSize, gridSize);
    }
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
    const maxX = Math.floor(canvas.width / gridSize);
    const maxY = Math.floor(canvas.height / gridSize);
    const x = Math.floor(Math.random() * maxX) * gridSize;
    const y = Math.floor(Math.random() * maxY) * gridSize;
    return { x, y };
}
