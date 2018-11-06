
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
//position of enemy beetles
var enemyPosition= [60, 70, 140, 225, 240];

// Enemies our player must avoid
//Appearance, starting postion, and speed of enemy
var Enemy = function (x, y, speed ) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
    this.x += this.speed * dt;

  //reset position of enemy to move across canvas with random speeds
    if (this.x > 505) {
        this.x=-50;
        this.speed = Math.floor((Math.random() *300)+100);
    }
    // Checks for collisions between the player and the enemies on the x and y axis gives height and width in pixels
    if (player.x < this.x  +65 &&
        player.x + 65 > this.x &&
        player.y < this.y + 50 &&
        50+ player.y > this.y) {
          player.x = 200;
          player.y = 400;
          //pop up on collision
          swal({
          icon: "warning",
          text:  "Stay Away From The Beetles!",
          button: "Start Over!",
    });
    };
};
//new enemy beetles are created at x=0 at the position of y with a speed of 300
enemyPosition.forEach(function (posY) {
enemy = new Enemy(0, posY, 300);
allEnemies.push(enemy);
});
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//Appearance and position of player
var Player = function (x, y) {
    //The image of the player of princess-girl is added to the playing field
    this.player = 'images/char-princess-girl.png';
    this.x = x;
    this.y = y;
};

Player.prototype.update = function (dt) {
  this.handleInput();
};
// Draw the image of the player on the screen, required method for game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};
// Allows the user to press the arrow keys to jump from tile to tile
Player.prototype.handleInput = function (keyPress) {

var xAxis = 100;
var yAxis = 83;

  // The positions of player moves on the gameboard and keeps players on canvas
    if (keyPress == 'left' && this.x > 0) {
        this.x -= xAxis;
    }else if (keyPress == 'right' && this.x < 400) {
          this.x += xAxis;
    }else if (keyPress == 'up' && this.y > 0) {
        this.y -= yAxis ;
    }else if (keyPress == 'down' && this.y < 400) {
        this.y += yAxis ;
    }
    //when player reaches water this repositions to start of game
    if (this.y < 0) {
        setTimeout(() => {
          this.x = 200;
          this.y = 400;
        }, 2000);
          //pop up for when you reach the water
              swal({
               title: "Good job!",
               text: "You Reached The Water!",
               icon: "success",
               button: "Play Again!",
           })
       };
    };
    // Place the player object in a variable called player
    //creates a new player at the postion of 200 and 400
    var player = new Player(200, 400);
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
