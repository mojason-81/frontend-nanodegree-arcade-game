var collectibles =
    {
      "blueGem":    "images/Gem\ Blue.png",
      "greenGem":   "images/Gem\ Green.png",
      "orangeGem":  "images/Gem\ Orange.png",
      "heart":      "images/Heart.png",
      "key":        "images/Key.png",
      "rock":       "images/Rock.png",
      "star":       "images/Star.png"
    };

// Generate a random starting point on the Y axis for player and enemies
var randomY = function() {
  positionY = [73, 156, 239];
  return (positionY[Math.floor(Math.random() * positionY.length)]);
};

// Generate a random X position for the collectibles
var randomX = function () {
  positionX = [0, 100, 200, 300, 400];
  return (positionX[Math.floor(Math.random() * positionX.length)]);
};

// Generate a random speed for the enemies to move across screen
var randomSpeed = function() {
  speed = [75, 101, 150, 202];
  return (speed[Math.floor(Math.random() * speed.length)]);
};

// Generate random collectibles to be rendered on game board
var randomCollectible = function() {
  var collectibleKeys = Object.keys(collectibles);
  var randomKey = collectibleKeys[Math.floor(Math.random() * collectibleKeys.length)];
  return collectibles[randomKey];
};

// Define collectible position
var Collectible = function() {
  this.y = randomY();
  this.x = randomX();
  this.sprite = randomCollectible();
};

// Render collectibles on game board
Collectible.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.speed = randomSpeed();
    this.x = -100;
    this.y = randomY();
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 600) {
      this.x = -100;
      this.y = randomY(this);
      this.speed = randomSpeed(this);
    }
    collision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    //if (this.x > 0) {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //}
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
  this.lives = 3;
  this.x = 200;
  this.y = 405;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
  if (this.y === -10) {
    gameData.score += 20;
    this.startOver();
  }
  //XXX Perhaps this could be used to determine collectibles on-hand
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
  if (direction === 'up' && this.y > -10) {
    this.y -= 83;
  }
  else if (direction === 'down' && this.y < 405) {
    this.y += 83;
  }
  else if (direction === 'left' && this.x > 0) {
    this.x -= 100;
  }
  else if (direction === 'right' && this.x < 400) {
    this.x += 100;
  }
};

Player.prototype.gameover = function() { //FIXME this needs to actually reset the game.
  console.log("Gameover Fool!");
  gameData.reset();
};

Player.prototype.startOver = function() { //FIXME this needs to actually give a game over screen
  if (enemyCollision === true) {
    gameData.lives -= 1;
    enemyCollision = false;
  }
  if (gameData.lives > 0){
    this.x = 200;
    this.y = 405;
  }
  else {
    this.x = 200;
    this.y = 405;
    player.gameover();
  }
};

// Game data to be displayed on game board
var GameData = function() {
  this.lives = 3;
  this.score = 0;
  this.level = 0;
};

// Render game data on game board
GameData.prototype.render = function() {
  var livesText = "Lives: " + gameData.lives;
  var scoreText = "Score: " + gameData.score;
  var textBoxWidth;
  ctx.font = "22px sans-serif";
  switch(gameData.lives) {
    case 2:
      ctx.fillStyle = "yellow";
      break;
    case 1:
      ctx.fillStyle = "red";
      break;
    default:
      ctx.fillStyle = "green";
  }
  // Dynamically set the width of the text box for game data
  if (gameData.score === 0){
    textBoxWidth = 92;
  } else if (gameData.score < 100) {
    textBoxWidth = 105;
  } else if (gameData.score < 999) {
    textBoxWidth = 115;
  }
  else {
    textBoxWidth = 127;
  }
  ctx.fillRect(5, 480, textBoxWidth, 50);
  ctx.textAlign = "left";
  ctx.fillStyle = "black";
  //ctx.strokeStyle = "white";
  ctx.shadowColor = "white";
  ctx.shadowOffsetX = "10px";
  ctx.shadowOffsetY = "10px";
  ctx.lineWidth = 0.5;
  ctx.fillText(livesText, 10, 500);
  ctx.strokeText(livesText, 10, 500);
  ctx.fillText(scoreText, 10, 525);
  ctx.strokeText(scoreText, 10, 525);
};

GameData.prototype.update = function() {
  // This is where all the game data is updated...maybe
};

// Reset game data on Game Over
GameData.prototype.reset = function() {
  this.lives = 3;
  this.score = 0;
  this.level = 0;
};

// Instantiate Collectibles
var allCollectibles = [];
for (i = 0; i < 2; i ++) {
  allCollectibles.push(new Collectible());
}

// Instantiate Enemies
var allEnemies = [];
for (i = 0; i < 5; i ++) {
  allEnemies.push(new Enemy());
}

// Instantiate Player
var player = new Player();

// Instantiate Collectibles
var allCollectibles = [];
for (i = 0; i < 2; i ++) {
  allCollectibles.push(new Collectible());
}

// Instantiate new gameData object to hold game data
var gameData = new GameData();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Collision detection
var enemyCollision = false;
var collision = function(){
  allEnemies.forEach(function(enemy){
    if ((enemy.y - player.y < 30) && (enemy.x - player.x < 30)){
      if ((enemy.y - player.y > -30) && (enemy.x - player.x > -30)){
        enemyCollision = true;
        player.startOver();
      }
    }
  });
};
