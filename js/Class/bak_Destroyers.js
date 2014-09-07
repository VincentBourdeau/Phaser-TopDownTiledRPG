
/**
 *
 *  Class Destroyers
 *
 *  Destroyers enemie Class
 *
 */

Destroyers = function ( game ) {

    //  Game's vars
    this.game = game;

    //  Destroyer
    this.DestroyersPool = null;
    this.reward = 1000;
    this.dropRate = 0.5;
    this.nextDestroyerAt = 0;
    this.destroyerSpawnAt = 25000;
    this.destroyerSpawnRate = 30000;
    this.destroyerInitialHealth = 100;

};

Destroyers.prototype = {

  /**
   *
   *  FUNCTION create();
   *
   *  Constructor, init, add default + intro text
   *
   */
  create: function(){

    //  Setup Destroyers
    this.DestroyersPool = this.game.add.group();
    this.DestroyersPool.enableBody = true;
    this.DestroyersPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.DestroyersPool.createMultiple(20, 'destroyer');
    this.DestroyersPool.setAll('anchor.x', 0.5);
    this.DestroyersPool.setAll('anchor.y', 0.5);
    this.DestroyersPool.setAll('scale.x', 0.7);
    this.DestroyersPool.setAll('scale.y', 0.7);
    this.DestroyersPool.setAll('outOfBoundsKill', true);
    this.DestroyersPool.setAll('checkWorldBounds', true);
    this.DestroyersPool.setAll('reward', this.reward, false, false, 0, true);
    this.DestroyersPool.setAll('dropRate', this.dropRate, false, false, 0, true);

    // Set the animation for each sprite
    this.DestroyersPool.forEach(function(destroyer) {
      destroyer.animations.add('move', [0, 1], 20, true);
      destroyer.animations.add('hit', [0, 2, 0, 2], 20, false);
      destroyer.events.onAnimationComplete.add(function(d) {
        d.play('move');
      }, this);
    });

    // Start spawning at ...
    this.nextDestroyerAt = this.game.time.now + this.destroyerSpawnAt;

  },

  /**
   *
   *  FUNCTION update();
   *
   *  EnterFrame, process timed events
   *
   */
  update: function(){

    //  Add Destroyer
    if (this.nextDestroyerAt < this.game.time.now && this.DestroyersPool.countDead() > 0) {

      this.nextDestroyerAt = this.game.time.now + this.destroyerSpawnRate;

      var destroyer = this.DestroyersPool.getFirstExists(false);

      // spawn at a random location at the top
      destroyer.reset(this.game.rnd.integerInRange(20, 1004), 0,
        this.destroyerInitialHealth);

      // choose a random target location at the bottom
      var target = this.game.rnd.integerInRange(20, 1004);

      // move to target and rotate the sprite accordingly
      destroyer.rotation = this.game.physics.arcade.moveToXY(
        destroyer, target, 768, 20
      ) - Math.PI / 2;

      destroyer.play('move');

      // each destroyer has their own shot timer
      //destroyer.nextShotAt = 0;

    }


  },

  //  Debug function
  render: function(){},
  
  




  /**
   *==================================
   * MISC FUNCTIONS
   * Custom made function
   *==================================
   */



  /**
   *
   *  FUNCTION endStage();
   *
   *
   *
   */
  endStage: function(pointer) {

    //  Destroyz
    this.DestroyersPool.destroy();

  },

  /**
   *
   *  FUNCTION quitGame();
   *
   *
   *
   */
  quitGame: function(pointer) {

    //  Destroyz

  }

}
