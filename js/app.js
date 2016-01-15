var collectibles =
    {
      "blueGem": "images/Gem\ Blue.png",
      "greenGem": "images/Gem\ Green.png",
      "orangeGem": "images/Gem\ Orange.png",
      "heart": "images/Heart.png",
      "key": "images/Key.png",
      "rock": "images/Rock.png",
      "star": "images/Star.png"
    };

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.initialY = [73, 156, 239];
    this.randomY = (this.initialY[Math.floor(Math.random() * this.initialY.length)]); // TODO need to abstract to fn
    this.speed = [75, 101, 150, 202];
    this.randomSpeed = (this.speed[Math.floor(Math.random() * this.speed.length)]); // TODO need to abstract to fn
    this.x = -101;
    this.y = this.randomY;
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
    //console.log(this.x);
    this.x += this.randomSpeed * dt;
    //console.log(this.x);
    //console.log(this.randomSpeed);
    if (this.x > 600) {
      this.x = -101;
      this.y = (this.initialY[Math.floor(Math.random() * this.initialY.length)]); // TODO need to abstract to fn
      this.randomSpeed = (this.speed[Math.floor(Math.random() * this.speed.length)]); // TODO need to abstract to fn
    }
    collision();
    //console.log(this.x);
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
  //console.log("X is: ", this.x, "Y is: ", this.y);
};

Player.prototype.gameover = function() { //FIXME this needs to actually reset the game.
  console.log("Gameover Fool!");
  this.lives = 3;
};

Player.prototype.startOver = function() {
  this.lives -= 1;
  if (this.lives > 0){
    this.x = 200;
    this.y = 405;
  }
  else {
    this.x = 200;
    this.y = 405;
    player.gameover();
  }
  console.log("Lives: ", this.lives);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
for (i = 0; i < 5; i ++) {
  allEnemies.push(new Enemy());
  //console.log(allEnemies);
}
// Place the player object in a variable called player
var player = new Player();



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
var collision = function(){
  allEnemies.forEach(function(enemy){
    if ((enemy.y - player.y < 30) && (enemy.x - player.x < 30)){
      if ((enemy.y - player.y > -30) && (enemy.x - player.x > -30)){
        //console.log("Y: ", enemy.y - player.y, "X: ", enemy.x - player.x);
        player.startOver();
      }
    }
  });
};
