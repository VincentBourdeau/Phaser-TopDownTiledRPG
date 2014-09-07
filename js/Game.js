BasicGame.Game = function(game) {

  //  When a State is added to Phaser it automatically has the following properties set on it,
  //  even if they already exist:

  // Phaser's Vars
  this.game;        //	a reference to the currently running game
  this.add;         //	used to add sprites, text, groups, etc
  this.camera;      //	a reference to the game camera
  this.cache;       //	the game cache
  this.input;       //	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
  this.load;        //	for preloading assets
  this.math;        //	lots of useful common math operations
  this.sound;       //	the sound manager - add a sound, play one, set-up markers, etc
  this.stage;       //	the game stage
  this.time;        //	the clock
  this.tweens;      //  the tween manager
  this.state;       //	the state manager
  this.world;       //	the game world
  this.particles;   //	the particle manager
  this.physics;     //	the physics manager
  this.rnd;         //	the repeatable random number generator

};

BasicGame.Game.prototype = {

  /**
   *==================================
   * Init();
   * Initialize game variables
   *==================================
   */
  initVars: function(){

    this.map = null;
    this.backgroundlayer = null;
    this.blockedLayer = null;

    this.cursors = null;

    this.player = null;
    this.items = null;
    this.doors = null;

  },

  /**
   *==================================
   * DEFAULT PHASER'S AUTO FUNCTIONS
   *==================================
   */
  create: function() {

    this.initVars();

    //physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.map = this.game.add.tilemap('level2');

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map.addTilesetImage('tiles', 'gameTiles');

    //create layer
    this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.blockedLayer = this.map.createLayer('blockedLayer');

    //collision on blockedLayer
    this.map.setCollisionBetween(1, 100000, true, 'blockedLayer');

    //resizes the game world to match the layer dimensions
    this.backgroundlayer.resizeWorld();

    this.createPlayer();
    this.createItems();
    this.createDoors();

  },

  update: function() {

    //player movement
    this.player.body.velocity.y = 0;
    this.player.body.velocity.x = 0;

    if(this.cursors.up.isDown) {
      this.player.body.velocity.y -= 50;
    }
    else if(this.cursors.down.isDown) {
      this.player.body.velocity.y += 50;
    }
    if(this.cursors.left.isDown) {
      this.player.body.velocity.x -= 50;
    }
    else if(this.cursors.right.isDown) {
      this.player.body.velocity.x += 50;
    }

    //Collisions
    this.game.physics.arcade.collide(this.player, this.blockedLayer);
    this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this);
    this.game.physics.arcade.overlap(this.player, this.doors, this.enterDoor, null, this);

  },

  //  Debug ...
  render: function() {},

  /**
   *==================================
   * MISC FUNCTIONS
   * Custom made function
   *==================================
  */

  /**
   *
   *  FUNCTION createPlayer();
   *  create the player
   *
   *
  */
  createPlayer: function() {

    var result = [];

    result = this.findObjectsByType('playerStart', this.map, 'objectsLayer');

    //we know there is just one result
    this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
    this.game.physics.arcade.enable(this.player);

    //the camera will follow the player in the world
    this.game.camera.follow(this.player);

  },

  /**
   *
   *  FUNCTION createItems();
   *  create items
   *
   *
  */
  createItems: function() {

    this.items = this.game.add.group();
    this.items.enableBody = true;

    var item;
    var result = [];

    result = this.findObjectsByType('item', this.map, 'objectsLayer');

    result.forEach(function(element){
      this.createFromTiledObject(element, this.items);
    }, this);

  },

  /**
   *
   *  FUNCTION createDoors();
   *  create doors
   *
   *
  */
  createDoors: function() {

    this.doors = this.game.add.group();
    this.doors.enableBody = true;

    var door;
    var result = [];

    result = this.findObjectsByType('door', this.map, 'objectsLayer');

    result.forEach(function(element){
      this.createFromTiledObject(element, this.doors);
    }, this);

  },

  /**
   *
   *  FUNCTION findObjectsByType();
   *  find objects in a Tiled layer that containt
   *  a property called "type" equal to a certain value
   *
   *
  */
  findObjectsByType: function(type, map, layer) {

    var result = [];

    map.objects[layer].forEach(function(element){
      if(element.properties.type === type) {
        //Phaser uses top left, Tiled bottom left so we have to adjust the y position
        //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
        //so they might not be placed in the exact pixel position as in Tiled
        element.y -= map.tileHeight;
        result.push(element);
      }
    });

    return result;

  },

  /**
   *
   *  FUNCTION createFromTiledObject();
   *  create a sprite from an object
   *
   *
  */
  createFromTiledObject: function(element, group) {

    var sprite = group.create(element.x, element.y, element.properties.sprite);

    //copy all properties to the sprite
    Object.keys(element.properties).forEach(function(key){
      sprite[key] = element.properties[key];
    });

  },

  /**
   *
   *  FUNCTION collect();
   *
   *
  */
  collect: function(player, collectable) {

    console.log('yummy!');

    //remove sprite
    collectable.destroy();

  },

  /**
   *
   *  FUNCTION enterDoor();
   *
   *
  */
  enterDoor: function(player, door) {
    console.log('entering door that will take you to '+door.targetTilemap+' on x:'+door.targetX+' and y:'+door.targetY);
  },

  /**
   *
   *  FUNCTION quitGame();
   *
   *
   *
  */
  quitGame: function(pointer) {

    //  Here you should destroy anything you no longer need.
    //  Stop music, delete sprites, purge caches, free resources, all that good stuff.


    //	Then let's go back to the main menu.
    this.state.start('MainMenu');

  }

};
