 // Create the state that will contain the whole game
var mainState = {  

    preload: function() {  
		game.load.atlas('breakout', 'assets/breakout.png', 'assets/breakout.json');
		game.load.image('starfield', 'assets/starfield.jpg');
    },

    create: function() {  
        // Here we create the game
		
		// Set the background color to blue
		//game.stage.backgroundColor = '#3598db';
		s = game.add.tileSprite(0, 0, 800, 600, 'starfield');

		// Start the Arcade physics system (for movements and collisions)
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Add the physics engine to all the game objetcs
		game.world.enableBody = true;
		
		
		// Create the left/right arrow keys
		this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);


		
		// add the ball
		this.ball = game.add.sprite(200, 200, 'breakout', 'ball_1.png');
		
		this.ball.body.velocity.x = 200;
		this.ball.body.velocity.y = 200;
		
		this.ball.body.bounce.setTo(1);
		this.ball.body.collideWorldBounds = true;
		
		//this.paddle.body.velocity.x = 200;
		//this.paddle.body.velocity.x = 200;
		
		// Add the paddle at the bottom of the screen
		this.paddle = game.add.sprite(game.world.centerX, 400, 'breakout', 'paddle_big.png');
		this.paddle.body.collideWorldBounds = true;
		// Make sure the paddle won't move when it hits the ball
		this.paddle.body.immovable = true;
		
		
		bricks = game.add.group();
		bricks.enableBody = true;
		bricks.physicsBodyType = Phaser.Physics.ARCADE;
		
		//var brick;

		for (var y = 0; y < 4; y++)
		{
			for (var x = 0; x < 15; x++)
			{
				var brick = game.add.sprite(120 + (x * 36), 100 + (y * 52), 'breakout', 'brick_' + (y+1) + '_1.png');
				brick.body.bounce.set(1);
				brick.body.immovable = true;
				bricks.add(brick)
			}
		}
    },

    update: function() {
		//if (Phaser.Rectangle.contains(paddle.body, game.input.x, game.input.y))
		//	this.paddle.body.velocity.setTo(0,0);
		//else
		this.paddle.x = game.input.x || game.world.width*0.5;
	
		/*if (Phaser.Rectangle.contains(this.paddle.body, game.input.x, game.input.y))
			this.paddle.body.velocity.setTo(0,0);
		else
			game.physics.arcade.moveToPointer(this.paddle, 500);
        // Here we update the game 60 times per second
		// Move the paddle left/right when an arrow key is pressed
		if (this.left.isDown) this.paddle.body.velocity.x = -300;
		else if (this.right.isDown) this.paddle.body.velocity.x = 300; 

		// Stop the paddle when no key is pressed
		//else this.paddle.body.velocity.x = 0;  
		*/
		
		game.physics.arcade.collide(this.paddle, this.ball);
		game.physics.arcade.collide(this.ball, bricks, this.hit, null, this);
		
		if (this.ball.y > this.paddle.y)
			game.state.start('main');
    },
	hit: function(ball, brick) {
		brick.kill()
	},
};

// Initialize the game and start our state
var game = new Phaser.Game(800, 600);  
var bricks;
game.state.add('main', mainState);  
game.state.start('main');