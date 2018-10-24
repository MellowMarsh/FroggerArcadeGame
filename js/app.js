// Enemies our player must avoid
//Appearance, starting postion, and speed of enemy

var Enemy = function (x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed
  
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
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
    if (this.x > 550) {
        this.x = 0;
        this.speed =Math.floor((Math.random() * 500)+100);
    }
    // Checks for collisions between the player and the enemies on the x and y axis
    if (player.x < this.x + 90 &&
        player.x + 60 > this.x &&
        player.y < this.y + 30 &&
        35 + player.y > this.y) {
        player.x = 205;
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
var Player = function (x, y) {
    this.x = x;
    this.y = y;
    //The image of the player of princess-girl is added to the playing field
    this.player = 'images/char-princess-girl.png';

};
// Draw the image of the player on the screen, required method for game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

Player.prototype.update = function (dt) {

};

// Allows the user to use the arrow keys to jump from tile to tile
Player.prototype.handleInput = function (keyPress) {

var xAxis = 83;
var yAxis = 100;



    if (keyPress == 'left' && this.x > 0) {
        this.x -= yAxis;
    };

    if (keyPress == 'right' && this.x < 410) {
          this.x += yAxis;
      };

    if (keyPress == 'up' && this.y > 0) {
        this.y -= xAxis ;
    };
    if (keyPress == 'down' && this.y < 410) {
        this.y += xAxis ;
    };
    //when player reaches water repostion to start of game
     if (this.y < 0) {
         setTimeout(() => {
             this.x = 205;
             this.y = 410;
         }, 500);
   };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
//posion of enemy on the x and y axis
var enemy= [60, 140, 225];

var player = new Player(205, 410);

enemy.forEach(function (posY) {
  enemy = new Enemy(0, posY,100);

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
