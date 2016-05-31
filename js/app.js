// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    var yMax = 235; // end position where Enemies can appear/move
    var yMin = 40; // start position where Enemies can appear/move
    this.x = -100; // start enemies out of field
    // start enemies position at random, but only in the street
    this.y = Math.floor((Math.random() * yMax) + yMin);
    // make sure that enemy vertical position does not overlap
    this.speedMax = 20; // max speed the enemies can move
    this.speedMin = 40;

    // set enemy's speed at random between max and min enemy speed
    this.speed = Math.floor((Math.random() * this.speedMax) + this.speedMin);

 };

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    // delete Enemy objects once they move out of the field
    var xMax = 400; // rightmost end of field

    // Re-initiate enemy's position once it moves out of the field.
    if ( this.x > xMax ) {
        this.x = -100;
        this.speed = Math.floor((Math.random() * this.speedMax) + this.speedMin);
    }

    // Handle Collisions
    var collisionOffset = 35;
    if( Math.abs(player.x - this.x) < collisionOffset &&
            Math.abs(player.y - this.y) < collisionOffset){
        console.log("A collision happened");
        player.restart(); // returns player to initial position and lowers its score
    }




};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 0;
    this.y = 435;
    this.speed = 10;
};

Player.prototype.update = function(dt) {


};

Player.prototype.restart = function() {
    this.x = 0;
    this.y = 400;

};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {

    var stride = 40; // pixels to displace each time player moves

    // bind keyboard keys to player's motion. And only allow player to move within field.
    switch(key){
        case 'left':
            if( this.x > 0 ) {
                this.x -= stride;
            }
            break;
        case 'right':
            if (this.x < 400 ) {
                this.x += stride;
            }
            break;
        case 'up':
            if( this.y > 0  ) {
                this.y -= stride;
            }
            break;
        case 'down':
            if( this.y < 395) {
                this.y += stride;
            }
            break;
    }

};


// TODO: create a Gem class and make gems appear in the field.


// TODO: create a scoring system, so that the player gets points when he collects gems,
//       but looses points when he collides with an enemy


/* Instantiating Game Objects */

// Project instruction: Place all enemy objects in an array called allEnemies
var allEnemies = [];
for(var i = 0; i < 2; i++){
    allEnemies.push(new Enemy(i));
}
// Project instruction: Place the player object in a variable called player
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
