const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const box = 20; // Size of grid box
let snake;
let fruit;
let score;
let direction;
let gameInterval;

function startGame() {
    snake = [{ x: 9 * box, y: 10 * box }];
    fruit = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box,
    };
    score = 0;
    direction = null;
    clearInterval(gameInterval);
    gameInterval = setInterval(draw, 100);
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
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "lime" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(fruit.x, fruit.y, box, box);

    let headX = snake[0].x;
    let headY = snake[0].y;

    if (direction == "LEFT") headX -= box;
    if (direction == "UP") headY -= box;
    if (direction == "RIGHT") headX += box;
    if (direction == "DOWN") headY += box;

    if (headX == fruit.x && headY == fruit.y) {
        score++;
        fruit = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box,
        };
    } else {
        snake.pop();
    }

    let newHead = { x: headX, y: headY };

    if (
        headX < 0 || headY < 0 ||
        headX >= canvas.width || headY >= canvas.height ||
        collision(newHead, snake)
    ) {
        clearInterval(gameInterval);
        alert("Game Over! Your score: " + score);
        return;
    }

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
