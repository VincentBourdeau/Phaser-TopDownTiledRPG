
/**
 *
 *  Class HUD
 *
 *  Handles Text rendering for UI
 *
*/

HUD = function ( game, score, playerLifes, nbBombs, stage ) {

    //  Game's vars
    this.game = game;
    this.score = score;
    this.nbLifes = playerLifes;
    this.nbBombs = nbBombs;
    this.gameStage = stage;

    //  HUD.instructions
    this.instructions = null;
    this.instExpire = 0;
    this.instTxt = 'Use Arrow Keys to Move, Press Z to Fire\n' + 'Tapping/clicking does both';
    this.instStyle = {
      font: '20px monospace',
      fill: '#fff',
      align: 'center'
    };

    //  HUD.scoreText
    this.scoreText = null;
    this.scoreTxtStyle = {
      font: '20px monospace',
      fill: '#fff',
      align: 'center'
    };

    //  HUD.returnText
    this.returnText = null;
    this.showReturn = false;
    this.showReturnDuration = 2000;
    this.showReturnTxt = 'Press Z or Tap Game to go back to Main Menu';
    this.showReturnStyle = {
      font: '16px sans-serif',
      fill: '#fff'
    };

    //  HUD.endText
    this.endText = null;
    this.endTxtStyle = {
      font: '72px serif',
      fill: '#fff'
    };

    //  Lives Icons
    this.livesIcons = null;

    //  Bombs Icons
    this.bombsIconsPool = null;

    //  Stage text
    this.curStage = null;
    this.curStageText = "Stage : ";

    //  Score Board 
    this.scoreBoard = null;
    this.SBText = null;
    this.SBTxtStyle = {
      font: '25px sans-serif',
      fill: '#fff'
    };
    this.SBTxtStyle2 = {
      font: '20px sans-serif',
      fill: '#fff'
    };
    this.SBTextTxt = "Scoreboard :";
    this.SBEnemyIcon = null;
    this.SBEnemyTxt = null;
    this.SBNbEnemy = 0;
    this.SBShooterIcon = null;
    this.SBShooterTxt = null;
    this.SBNbShooter = 0;
    this.SBBossIcon = null;
    this.SBBossTxt = null;
    this.SBNbBoss = 0;

};

HUD.prototype = {

  /**
   *
   *  FUNCTION create();
   *
   *  Constructor, init, add default + intro text
   *
   */
  create: function(){

    //  Add HUD.insctructions
    this.instructions = this.game.add.text(510, 600, this.instTxt, this.instStyle);
    this.instructions.anchor.setTo(0.5, 0.5);
    this.instExpire = this.game.time.now + 10000;

    //  Add HUD.scoreText
    this.scoreText = this.game.add.text(510, 70, '' + this.score, this.scoreTxtStyle);
    this.scoreText.anchor.setTo(0.5, 0.5);

    //  Add HUD.curStage
    this.curStage = this.game.add.text(510, 30, '' + this.curStageText + this.gameStage, this.scoreTxtStyle);
    this.curStage.anchor.setTo(0.5, 0.5);

    //  Add Lifes icons
    this.livesIcons = this.game.add.group();
    for (var i = 0; i < this.nbLifes; i++) {
      var life = this.livesIcons.create(924 + (30 * i), 30, 'player');
      life.scale.setTo(0.5, 0.5);
      life.anchor.setTo(0.5, 0.5);
    }

    //  Add Bombs icons
    this.bombsIconsPool = this.game.add.group();
    for (var i = 0; i < this.nbBombs; i++) {
      var bomb = this.bombsIconsPool.create(30 + (30 * i), 30, 'bomb');
      bomb.anchor.setTo(0.5, 0.5);
    }

  },

  /**
   *
   *  FUNCTION update();
   *
   *  EnterFrame, process timed events
   *
   */
  update: function(){

    //  Fade the intro instructions out after a set period of time
    if (this.instructions.exists && this.game.time.now > this.instExpire) {

      this.instructions.destroy();

    }

    //  Add a “back to main menu” after a set period of time
    if (this.showReturn && this.game.time.now > this.showReturn) {

      var msg = this.showReturnTxt;

      if( this.gameStage < 2 && this.nbLifes ) msg = "Entering stage : " + (this.gameStage + 1);

      this.returnText = this.game.add.text(512, 700, msg, this.showReturnStyle);
      this.returnText.anchor.setTo(0.5, 0.5);
      this.showReturn = false;

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
   *  FUNCTION removeBomb();
   *
   *
   *
  */
  removeBomb: function(){

    this.bombsIconsPool.getFirstAlive().kill();
    this.nbBombs--;

  },

  /**
   *
   *  FUNCTION removeLife();
   *
   *
   *
  */
  removeLife: function(){

    this.livesIcons.getFirstAlive().kill();
    this.nbLifes--;

  },

  /**
   *
   *  FUNCTION updateScore();
   *
   *
   *
  */
  updateScore: function(score){

    this.score = score;

    this.scoreText.text = this.score;

  },

  /**
   *
   *  FUNCTION refreshInfos();
   *
   *
   *
   */
  refreshInfos: function(stage, nbEnemyKill, nbShooterKill, nbBossKill){

    this.gameStage = stage;
    this.SBNbEnemy = nbEnemyKill;
    this.SBNbShooter = nbShooterKill;
    this.SBNbBoss = nbBossKill;

    console.log("updated");

  },

  /**
   *
   *  FUNCTION displayEnd();
   *
   *
   *
   */
  displayEnd: function(win){
    console.log(this.SBNbEnemy);
    console.log(this.SBNbShooter);
    console.log(this.SBNbBoss);
    //  Display end Msg
    var msg = win ? 'You Win!!!' : 'Game Over!';
    this.endText = this.game.add.text(510, 150, msg, this.endTxtStyle);
    this.endText.anchor.setTo(0.5, 0);

    //  Display Scoreboard
    this.scoreBoard = this.game.add.group();

    this.SBText = this.game.add.text(510, 300, this.SBTextTxt, this.SBTxtStyle);
    this.SBText.anchor.setTo(0.5, 0);

    this.scoreBoard.add(this.SBText);

    this.SBEnemyTxt = this.game.add.text(510, 360, " X " + this.SBNbEnemy, this.SBTxtStyle2);
    this.SBEnemyTxt.anchor.setTo(0.5, 0);
    this.SBEnemyIcon = this.game.add.sprite(450, 360, 'greenEnemy');
    this.SBEnemyTxt.anchor.setTo(0.5, 0);

    this.scoreBoard.add(this.SBEnemyTxt);
    this.scoreBoard.add(this.SBEnemyIcon);

    this.SBShooterTxt = this.game.add.text(510, 420, " X " + this.SBNbShooter, this.SBTxtStyle2);
    this.SBShooterTxt.anchor.setTo(0.5, 0);
    this.SBShooterIcon = this.game.add.sprite(450, 420, 'whiteEnemy');

    this.scoreBoard.add(this.SBShooterTxt);
    this.scoreBoard.add(this.SBShooterIcon);

    this.SBBossTxt = this.game.add.text(510, 480, " X " + this.SBNbBoss, this.SBTxtStyle2);
    this.SBBossTxt.anchor.setTo(0.5, 0);
    this.SBBossIcon = this.game.add.sprite(410, 480, 'boss');

    this.scoreBoard.add(this.SBBossTxt);
    this.scoreBoard.add(this.SBBossIcon);

    //  Show “back to main menu” in [x] seconds
    this.showReturn = this.game.time.now + this.showReturnDuration;

  },

  nextStage: function(stage){

    this.gameStage = stage;

    this.curStage.text = '' + this.curStageText + this.gameStage;

    this.endText.destroy();
    this.returnText.destroy();

    this.scoreBoard.destroy();

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
    this.instructions.destroy();
    this.scoreText.destroy();
    this.curStage.destroy();
    this.returnText.destroy();

  }

}
