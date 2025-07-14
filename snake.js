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
    if (direction === "UP") head.y -= 40;
    if (direction === "DOWN") head.y += 40;
    if (direction === "LEFT") head.x -= 40;
    if (direction === "RIGHT") head.x += 40;

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
                ctx.drawImage(snakeHeadImg, seg.x, seg.y, 40, 40);
            } else {
                ctx.drawImage(snakeBodyImg, seg.x, seg.y, 40, 40);
            }
        } catch (e) {
            // fallback color if images fail
            ctx.fillStyle = idx === 0 ? "#4CAF50" : "#8BC34A";
            ctx.fillRect(seg.x, seg.y, 40, 40);
        }
    });
    try {
        ctx.drawImage(mouseImg, food.x, food.y, 40, 40);
    } catch (e) {
        ctx.fillStyle = "#FF5252";
        ctx.fillRect(food.x, food.y, 40, 40);
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
    const x = Math.floor(Math.random() * (canvas.width / 40)) * 40;
    const y = Math.floor(Math.random() * (canvas.height / 40)) * 40;
    return { x, y };
}
