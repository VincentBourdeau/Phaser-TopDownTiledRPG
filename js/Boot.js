var BasicGame = {};

BasicGame.Boot = function (game) {

};

BasicGame.Boot.prototype = {

  preload: function () {

    //  Here we load the assets required for our preloader (in this case a background and a loading bar)
    this.load.image('preloaderBackground', 'assets/interface/preloader_background.jpg');
    this.load.image('preloaderBar', 'assets/interface/preloadr_bar.png');

  },

  create: function () {

    //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
    this.input.maxPointers = 1;

    //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
    this.stage.disableVisibilityChange = true;

    if (this.game.device.desktop){
      //  If you have any desktop specific settings, they can go in here

      //scaling options
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

      //have the game centered horizontally
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;

      //screen size will be set automatically
      //this.scale.setScreenSize(true);

    }else{
      //  Same goes for mobile settings.
      //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.minWidth = 160;
      this.scale.minHeight = 160;
      this.scale.maxWidth = 160;
      this.scale.maxHeight = 160;
      this.scale.forceLandscape = true;
      this.scale.pageAlignHorizontally = true;
      this.scale.setScreenSize(true);
    }

    //  By this point the preloader assets have loaded to the cache, we've set the game settings
    //  So now let's start the real preloader going
    this.state.start('Preloader');

  }

};