
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(0, 0, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);


		this.load.tilemap('level1', 'assets/game/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('level2', 'assets/game/tilemaps/level2.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('gameTiles', 'assets/game/tiles.png');
    this.load.image('greencup', 'assets/game/greencup.png');
    this.load.image('bluecup', 'assets/game/bluecup.png');
    this.load.image('player', 'assets/game/player.png');
    this.load.image('browndoor', 'assets/game/browndoor.png');
    this.load.image('potion_big_red', 'assets/game/potion_big_red.png');
    this.load.image('potion_big_yellow', 'assets/game/potion_big_yellow.png');
    this.load.image('door_red_leftpart', 'assets/game/door_red_leftpart.png');
    this.load.image('door_red_rightpart', 'assets/game/door_red_rightpart.png');

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, swap them for your own.
		this.load.image('titlepage', 'assets/interface/title.jpg');
		this.load.image('playButton', 'assets/interface/play_button.png');



		//this.load.atlas('playButton', 'assets/interface/play_button.png', 'images/play_button.json');
		/*this.load.audio('titleMusic', ['audio/main_menu.mp3']);
		this.load.bitmapFont('caslon', 'fonts/caslon.png', 'fonts/caslon.xml');*/
		//	+ lots of other required assets here

	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;
		this.ready = true;
		this.state.start('MainMenu');

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.

		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.

		/*if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}*/

	}

};
