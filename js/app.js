/**
 * @description create an Enemy object
 * @returns Enemy object
 */
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
    this.speedMin = 60;
    this.speedMax = 200; // max speed the enemies can move
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

    // Restart enemy's position once it moves out of the field.
    if ( this.x > xMax ) {
        // console.log("Enemy has reached the end of the street") // use for debugging
        this.x = -100;
        this.speed = 0;
        var minDelay = 500;
        var maxDelay = 1500;
        var delay = Math.floor((Math.random() * maxDelay) + minDelay);
        var that = this; // function setTimeout() points 'this' to global
        setTimeout(function() {
            //console.log(that.speedMax); // use for debugging
            that.speed = Math.floor((Math.random() * that.speedMax) + that.speedMin);
        }, delay);

    }

    // Handle Collisions
    var collisionOffset = 33.3;
    if( Math.abs(player.x - this.x) < collisionOffset &&
            Math.abs(player.y - this.y) < collisionOffset){
        //console.log("a collision happened!");
        player.restart(); // returns player to initial position and lowers its score
        player.score -= 20;
        $('#scoreNum').text(player.score);
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

/**
 * @description create a player object
 * @returns Player object
 */
var Player = function() {

    this.sprite = 'images/char-boy.png';
    this.x = 200; // center of x-axis in the field
    this.y = 380;
    this.speed = 10;
    this.score = 0;
};

Player.prototype.update = function(dt) {

    // reset game if player reaches the water
    var delay = 0; // 0.5 sec
    if( this.y < 10 ){
        this.restart();
    }

};

Player.prototype.restart = function() {
    this.x = 200;
    this.y = 400;

    allGems = [];
    allGems.push(new blueGem());
    allGems.push(new greenGem());
    allGems.push(new greenGem());






};

Player.prototype.increaseScore = function(pts) {
    player.score += pts;
    // console.log(player.score); // use for debugging
    $('#scoreNum').text(player.score);
}


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.handleInput = function(key) {

    var strideX = 505/5; // pixels to displace each time player moves horizontally
    var strideY = 510/6; // pixels to displace each time player moves vertically


    // bind keyboard keys to player's motion. And only allow player to move within field.
    switch(key){
        case 'left':
            if( this.x > 0 ) {
                this.x -= strideX;
            }
            break;
        case 'right':
            if (this.x < 400 ) {
                this.x += strideX;
            }
            break;
        case 'up':
            if( this.y > 0  ) {
                this.y -= strideY;
            }
            break;
        case 'down':
            if( this.y < 380) {
                this.y += strideY;
            }
            break;
    }

};

/**
 * @description create a Gem object
 * @returns Gem object
 */
var Gem = function() {

    var yMax = 200; // end position where Enemies can appear/move
    var yMin = 40; // start position where Enemies can appear/move
    var xMin = 0;
    var xMax = 400;
    this.x = Math.floor((Math.random() * xMax) + xMin);
    this.y = Math.floor((Math.random() * yMax) + yMin);

};

Gem.prototype.update = function() {

    // Handle pickups
    var offsetPickup = 55;
    if( Math.abs( this.x - player.x) < offsetPickup && Math.abs( this.y - player.y) < offsetPickup){
        //console.log("Just picked up a Gem"); // use for debugging
        this.x = -100; // remove from field
        player.increaseScore(this.value);
        delete this;
    }

};




/**
 * @description create a green Gem
 * @constructor Gem
 * @returns greenGem object
 */
var greenGem = function(){
    Gem.call(this);
    this.sprite = 'images/gem-green.png';
    this.value = 5; // to be used with score()
};

greenGem.prototype = Object.create(Gem.prototype);
greenGem.prototype.constructor = greenGem;
greenGem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/**
 * @description create a blue Gem
 * @constructor Gem
 * @returns blueGem object
 */
var blueGem = function(){
    Gem.call(this);
    this.sprite = 'images/gem-blue.png';
    this.value = 10;  // to be used with score()
};

blueGem.prototype = Object.create(Gem.prototype);
blueGem.prototype.constructor = blueGem;
blueGem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/* Instantiating Game Objects */

// Project instruction: Place all enemy objects in an array called allEnemies
var allEnemies = [];
for(var i = 0; i < 3; i++){
    allEnemies.push(new Enemy(i));
}

var player = new Player();

var allGems = [];
for(var i = 0; i < 2; i++){
    allGems.push(new greenGem(i));
}
for( var i = 0; i < 1; i++ ){
    allGems.push(new blueGem(i));
}



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



