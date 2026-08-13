//header

writeWebPageHeader();

function writeWebPageHeader() {
  document.getElementById("header").innerHTML = `
<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
        <a class="navbar-brand" href="index.html">Home</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" id="navbarNav" aria-expanded="false" aria-label="Toggle navigation" onclick="toggleNavBar()">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="import.html">Import</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="export.html">Export</a>
                </li>
                
                <li class="nav-item">
                    <a class="nav-link" href="direktbilar.html">Direktbilar</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="avgifter.html">Avgifter</a>
                </li>
                 <li class="nav-item">
                    <a class="nav-link" href="postal.html">Postal</a>
                </li>
                 <li class="nav-item">
                    <a class="nav-link" href="game.html">Game</a>
                </li>
                
              
             
             
            </ul>
        </div>
    </div>
</nav>
`;
}

class GameArea {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 800;
    this.canvas.height = 500;
    this.background = new Image();
    this.background.src = "spaceBackground.jpg";

    this.background.onload = () => {
      this.drawBackground();
    };
  }
  drawBackground() {
    this.ctx.drawImage(
      this.background,
      0,
      0,
      this.canvas.width,
      this.canvas.height,
    );
  }

  start() {}
}

class Projectile {
  constructor(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  move() {
    this.y -= 5;
  }
}

class SpaceRock {
  constructor(width, height, imageSrc, x, y) {
    this.width = width;
    this.image = new Image();
    this.image.src = imageSrc;
    this.height = height;
    this.x = x;
    this.y = y;
  }
  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  fall() {
    this.y += rockSpeed;
  }
}

class Ship {
  constructor(width, height, imageSrc, x, y) {
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = imageSrc;
    this.x = x;
    this.y = y;
  }
  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  moveLeft() {
    this.x -= 5;
  }
  moveright() {
    this.x += 5;
  }
}

function collide(objA, objB, buffer) {
  return !(
    objA.y + objA.height - buffer <= objB.y ||
    objA.y + buffer >= objB.y + objB.height ||
    objA.x + objA.width - buffer <= objB.x ||
    objA.x + buffer >= objB.x + objB.width
  );
}

function updateGame() {
  if (gameOver) return;
  handleInput();

  gameArea.ctx.clearRect(0, 0, gameArea.canvas.width, gameArea.canvas.height);
  gameArea.drawBackground();

  ship.draw(gameArea.ctx);
  projectiles.forEach((projectile) => {
    projectile.move();
    projectile.draw(gameArea.ctx);
  });
  projectiles = projectiles.filter((p) => p.y + p.height > 0);
  spaceRocks.forEach((spaceRock) => {
    spaceRock.draw(gameArea.ctx);
    if (spaceRock.y < gameArea.canvas.height) {
      spaceRock.fall();
    } else {
      spaceRock.y = Math.random() * -300;
      spaceRock.x = Math.random() * (gameArea.canvas.width - spaceRock.width);
    }
    //spaceRock.x = Math.random() * (gameArea.canvas.width - spaceRock.width);
  });
  if (spaceRocks.some((rock) => collide(rock, ship, 17.5))) {
    gameOver = true;
    const ctx = gameArea.ctx;
    const centerX = gameArea.canvas.width / 2;
    const centerY = gameArea.canvas.height / 2;

    ctx.fillStyle = "rgba(48, 48, 48, 0.6)"; //
    ctx.textAlign = "center"; // horizontal center
    ctx.textBaseline = "middle"; // vertical anchor = middle
    ctx.fillRect(centerX - 200, centerY - 125, centerX, 250); // semi-transparent background

    // Define the lines you want to draw
    const lines = [
      { text: "GAME OVER!", fontStyles: "bold 32px Arial" },
      { text: "Score: " + hitCount, fontStyles: "20px Arial" },
      {
        text: "Level: " + Math.floor(rockSpeed),
        fontStyles: "bold 20px Arial",
      },
      { text: "Press R to start over!", fontStyles: "16px Arial" },
      { text: "Press H to reset Highscore!", fontStyles: "16px Arial" },
      // {
      //   text: "High Score: " + (localStorage.getItem("highScore") || 0),
      //   size: "16px Arial",
      // },
    ];

    if (hitCount > highScore) {
      localStorage.setItem("highScore", hitCount);
      lines.push({
        text: "New High Score!",
        fontStyles: "bold 20px Arial",
      });
    }

    // spacing between lines
    const lineHeight = 40;

    // total block height
    const blockHeight = (lines.length - 1) * lineHeight;

    // draw each line so block is vertically centered
    lines.forEach((line, i) => {
      ctx.font = line.fontStyles;
      ctx.fillStyle = "white";
      if (i === 0) ctx.fillStyle = "red";
      ctx.fillText(
        line.text,
        centerX,
        centerY - blockHeight / 2 + i * lineHeight,
      );
    });

    return;
  }

  // Check for collisions between projectiles and rocks
  for (let i = spaceRocks.length - 1; i >= 0; i--) {
    for (let j = projectiles.length - 1; j >= 0; j--) {
      if (collide(spaceRocks[i], projectiles[j], 0)) {
        spaceRocks.splice(i, 1); // Remove rock
        projectiles.splice(j, 1); // Remove projectile
        hitCount = Math.floor((hitCount += rockSpeed)); // Increment score
        rockSpeed += 0.1; // Increase rock speed
        if (spaceRocks.length <= rockCount) {
          createRocks();
        }
        break; // Move to next rock
      }
    }
  }

  updateScore(gameArea.ctx);
  animationId = requestAnimationFrame(updateGame);
}

const updateScore = (context) => {
  context.fillStyle = "rgba(0, 0, 0, 0.2)"; // semi-transparent background
  context.textAlign = "left"; // reset so x=10 is the left edge
  context.textBaseline = "top";
  context.fillRect(0, 0, 150, 70); // background for score

  context.fillStyle = "white"; // text color

  const scoreCounter = [
    {
      text: "High Score: " + (localStorage.getItem("highScore") || 0),
      fontVals: "bold 16px Arial",
    },
    { text: "Score: " + hitCount, fontVals: "bold 16px Arial" },
    { text: "Level: " + Math.floor(rockSpeed), fontVals: "bold 16px Arial" },
  ];
  let lineHeight = 20;

  scoreCounter.forEach((line) => {
    gameArea.ctx.font = line.fontVals;
    gameArea.ctx.fillText(line.text, 10, lineHeight);
    lineHeight += 30;
  });
};

function createRocks() {
  while (spaceRocks.length < rockCount) {
    let isFreePos = false;
    let spaceRock;
    while (!isFreePos) {
      spaceRock = new SpaceRock(
        30,
        30,
        "spacerock.png",
        Math.random() * (gameArea.canvas.width - 30),
        Math.random() * -200,
      );
      isFreePos = spaceRocks.every(
        (existingRock) => !collide(existingRock, spaceRock, 5),
      );
    }
    spaceRocks.push(spaceRock);
  }
}

// Game Start!
const rockCount = 20;
let rockSpeed = 1;
let spaceRocks = [];
const gameArea = new GameArea();
let gameOver = false;
let gameWon = false;
let projectiles = [];
let hitCount = 0;
let animationId;
let highScore = localStorage.getItem("highScore") || 0;

const ship = new Ship(
  50,
  50,
  "ship.png",
  gameArea.canvas.width / 2,
  gameArea.canvas.height - 50,
);
spaceRocks.forEach((spaceRock) => {
  spaceRock.image.onload = () => spaceRock.draw(gameArea.ctx);
});

ship.image.onload = () => ship.draw(gameArea.ctx);
const keys = {};

addEventListener("keydown", (e) => {
  keys[e.key] = true;

  if (e.key === "ArrowUp" && !e.repeat) fireProjectile();
});

addEventListener("keyup", (e) => (keys[e.key] = false));

addEventListener("keydown", (e) => {
  if ((e.key === "R" && gameOver) || (e.key === "r" && gameOver)) StartGame();
  if ((e.key === "H" && gameOver) || (e.key === "h" && gameOver))
    ResetHighscore();
});

//Reset highscore
ResetHighscore = () => {
  localStorage.setItem("highScore", 0);
  highScore = 0;
  alert("Highscore reset!");
};

// Restart game

function handleInput() {
  if (keys["ArrowLeft"] && ship.x > 0) {
    ship.moveLeft();
  }
  if (keys["ArrowRight"] && ship.x < gameArea.canvas.width - ship.width) {
    ship.moveright();
  }
  //   //fire projectile
  if (keys["ArrowUp"]) {
  }
}

function fireProjectile() {
  let lastFireTime = 0;
  const fireCooldown = 300; // milliseconds
  const now = Date.now();
  if (now - lastFireTime > fireCooldown && projectiles.length < 3) {
    // Enforce cooldown
    projectiles.push(
      new Projectile(5, 10, "red", ship.x + ship.width / 2, ship.y),
    );

    lastFireTime = now;
  }
}

// Start the game loop
function StartGame() {
  if (animationId) cancelAnimationFrame(animationId);
  gameOver = false;
  hitCount = 0;
  rockSpeed = 1;

  spaceRocks = [];
  projectiles = [];

  // Place ship back at bottom center
  ship.x = gameArea.canvas.width / 2 - ship.width / 2;
  ship.y = gameArea.canvas.height - ship.height - 10;

  createRocks();
  animationId = requestAnimationFrame(updateGame);
}

StartGame();
