const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const snakeHeadImg = new Image();
snakeHeadImg.src = "assets/snake-head.png";

const snakeBodyImg = new Image();
snakeBodyImg.src = "assets/snake-body.png";

const mouseImg = new Image();
mouseImg.src = "assets/mouse.png";

const eatSound = document.getElementById("eatSound");
const gameOverSound = document.getElementById("gameOverSound");

let snake, mouse, direction, gameInterval, score, isGameOver;

function startGame() {
    snake = [
        { x: 300, y: 300, angle: 0 },
        { x: 280, y: 300, angle: 0 },
        { x: 260, y: 300, angle: 0 }
    ];
    mouse = getRandomMousePosition();
    direction = "RIGHT"; // Default so game starts moving
    score = 0;
    isGameOver = false;
    clearInterval(gameInterval);
    gameInterval = setInterval(updateGame, 1000 / 60); // 60 FPS
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

function updateGame() {
    if (isGameOver) return;

    let head = { ...snake[0] };
    let speed = 2;

    if (direction === "UP") head.y -= speed;
    if (direction === "DOWN") head.y += speed;
    if (direction === "LEFT") head.x -= speed;
    if (direction === "RIGHT") head.x += speed;

    // Update angle for head rotation
    head.angle = Math.atan2(head.y - snake[0].y, head.x - snake[0].x);

    // Add new head to the front
    snake.unshift(head);

    // Check for food collision
    if (isColliding(head, mouse, 20)) {
        eatSound.play();
        score++;
        mouse = getRandomMousePosition();
    } else {
        snake.pop(); // Remove tail segment
    }

    // Check wall collision
    if (
        head.x < 0 || head.x > canvas.width - 20 ||
        head.y < 0 || head.y > canvas.height - 20
    ) {
        endGame();
    }

    // Check self collision
    for (let i = 1; i < snake.length; i++) {
        if (isColliding(head, snake[i], 20)) {
            endGame();
        }
    }

    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawMouse();
}

function drawSnake() {
    for (let i = snake.length - 1; i >= 0; i--) {
        if (i === 0) {
            // Head
            ctx.save();
            ctx.translate(snake[i].x, snake[i].y);
            ctx.rotate(snake[i].angle);
            ctx.drawImage(snakeHeadImg, -15, -15, 30, 30);
            ctx.restore();
        } else {
            // Body
            ctx.drawImage(snakeBodyImg, snake[i].x - 10, snake[i].y - 10, 20, 20);
        }
    }
}

function drawMouse() {
    ctx.drawImage(mouseImg, mouse.x - 10, mouse.y - 10, 20, 20);
}

function getRandomMousePosition() {
    return {
        x: Math.floor(Math.random() * (canvas.width - 40)) + 20,
        y: Math.floor(Math.random() * (canvas.height - 40)) + 20
    };
}

function isColliding(a, b, size) {
    return (
        a.x < b.x + size &&
        a.x + size > b.x &&
        a.y < b.y + size &&
        a.y + size > b.y
    );
}

function endGame() {
    isGameOver = true;
    clearInterval(gameInterval);
    gameOverSound.play();
    setTimeout(() => {
        alert(`💥 Game Over! Your Score: ${score}`);
    }, 100);
}
