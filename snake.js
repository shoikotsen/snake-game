const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const box = 20;
let snake;
let mouse;
let score;
let direction;
let gameInterval;

const eatSound = document.getElementById("eatSound");
const gameOverSound = document.getElementById("gameOverSound");

function startGame() {
    snake = [{ x: 9 * box, y: 10 * box }];
    mouse = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box,
    };
    score = 0;
    direction = null;
    clearInterval(gameInterval);
    gameInterval = setInterval(draw, 150);
}

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    let key = event.keyCode;
    if (key == 37 && direction !== "RIGHT") direction = "LEFT";
    else if (key == 38 && direction !== "DOWN") direction = "UP";
    else if (key == 39 && direction !== "LEFT") direction = "RIGHT";
    else if (key == 40 && direction !== "UP") direction = "DOWN";
}

function draw() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "#00ff00" : "#66ff66"; // Head vs Body
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "#003300";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw mouse (food)
    ctx.font = "20px Arial";
    ctx.fillText("🐭", mouse.x, mouse.y + box);

    let headX = snake[0].x;
    let headY = snake[0].y;

    if (direction == "LEFT") headX -= box;
    if (direction == "UP") headY -= box;
    if (direction == "RIGHT") headX += box;
    if (direction == "DOWN") headY += box;

    // Check wall collision
    if (headX < 0 || headY < 0 || headX >= canvas.width || headY >= canvas.height) {
        gameOver();
        return;
    }

    // Check self-collision
    if (collision({ x: headX, y: headY }, snake)) {
        gameOver();
        return;
    }

    if (headX == mouse.x && headY == mouse.y) {
        score++;
        eatSound.play();
        mouse = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box,
        };
    } else {
        snake.pop();
    }

    let newHead = { x: headX, y: headY };
    snake.unshift(newHead);

    document.getElementById("score").innerText = score;
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

function gameOver() {
    clearInterval(gameInterval);
    gameOverSound.play();
    setTimeout(() => {
        alert("💥 Game Over! Your Score: " + score);
    }, 100);
}
