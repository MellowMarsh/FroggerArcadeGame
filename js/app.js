// Enemies our player must avoid
var Enemy = function (x, y, speed) {

    // The following variables are used to determine the x and y axis and speed of the enemy
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image of the enemy of cockroach that is added to the playing field
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
    this.x += this.speed * dt;
  //reset position of enemy to move across canvas
    if (this.x > 500) {
        this.x = 0;
        this.speed =100+Math.floor(Math.random() * 350);
    }
    // Checks for collisions between the player and the enemies on the x and y axis
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
        player.x = 200;
        player.y = 410;
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y, speed) {
    //The image of the player of princess-girl is added to the playing field
    this.player = 'images/char-princess-girl.png';
    this.x = x;
    this.y = y;
    this.speed= speed;
};

Player.prototype.update = function (dt) {

};

// Renders the image of the user into the game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

// Allows the user to use the arrow keys to jump from tile to tile
Player.prototype.handleInput = function (keyPress) {

    if (keyPress == 'left' && this.x > 0) {
        this.x -= 100;
    };

    if (keyPress == 'right' && this.x < 410) {
          this.x += 100;
      };

    if (keyPress == 'up' && this.y > 0) {
        this.y -= 83;
    };

    if (keyPress == 'down' && this.y < 410) {
        this.y += 83;
    };

    if (this.y < 0) {
        setTimeout(() => {
            this.x = 200;
            this.y = 410;
        }, 500);

  };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
//posion of enemy on the x and y axis
var enemy= [50, 150, 225];
var player = new Player(200, 410);

enemy.forEach(function (posY) {
  enemy = new Enemy(0, posY, 150);

    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
