let gameScene = new Phaser.Scene("Game");

gameScene.init = function() {
  this.stats = {
    health: 100,
    fun: 100
  };

  this.decayRates = {
    health: -1,
    fun: -1
  };
};

gameScene.create = function() {
  let bg = this.add.sprite(0, 0, "backyard").setInteractive();
  bg.setOrigin(0, 0);

  bg.on("pointerdown", this.placeItem, this);

  this.pet = this.add.sprite(100, 200, "pet", 0).setInteractive();
  this.pet.depth = 1;

  this.input.setDraggable(this.pet);

  this.input.on("drag", function(pointer, gameObject, dragX, dragY) {
    gameObject.x = dragX;
    gameObject.y = dragY;
  });

  this.createUi();

  this.createHud();
  this.refreshHud();

  this.timedEventStats = this.time.addEvent({
    delay: 1000,
    repeat: -1,
    callback: function() {
      this.updateStats(this.decayRates);
    },
    callbackScope: this
  });
};

gameScene.createUi = function() {
  this.appleBtn = this.add.sprite(300, 30, "apple").setInteractive();
  this.appleBtn.customStats = {
    health: 20,
    fun: 0
  };
  this.appleBtn.on("pointerdown", this.pickItem);

  this.candyBtn = this.add.sprite(385, 30, "candy").setInteractive();
  this.candyBtn.customStats = {
    health: -10,
    fun: 10
  };
  this.candyBtn.on("pointerdown", this.pickItem);

  this.toyBtn = this.add.sprite(470, 30, "toy").setInteractive();
  this.toyBtn.customStats = {
    health: 0,
    fun: 15
  };
  this.toyBtn.on("pointerdown", this.pickItem);

  this.buttons = [this.appleBtn, this.candyBtn, this.toyBtn];

  this.uiBlocked = false;

  this.uiReady();
};

gameScene.pickItem = function() {
  if (this.scene.uiBlocked) return;

  this.scene.uiReady();

  this.scene.selectedItem = this;

  this.alpha = 0.5;

  console.log("we are picking " + this.texture.key);
};

gameScene.uiReady = function() {
  this.selectedItem = null;

  for (let i = 0; i < this.buttons.length; i++) {
    this.buttons[i].alpha = 1;
  }

  this.uiBlocked = false;
};

gameScene.placeItem = function(pointer, localX, localY) {
  if (!this.selectedItem) return;

  if (this.uiBlocked) return;

  let newItem = this.add.sprite(localX, localY, this.selectedItem.texture.key);

  this.uiBlocked = true;

  let petTween = this.tweens.add({
    targets: this.pet,
    duration: 500,
    x: newItem.x,
    y: newItem.y,
    paused: false,
    callbackScope: this,
    onComplete: function(tween, sprites) {
      newItem.destroy();

      this.updateStats(this.selectedItem.customStats);

      this.uiReady();
    }
  });
};

gameScene.createHud = function() {
  this.healthText = this.add.text(20, 20, "Health: ", {
    font: "24px Arial",
    fill: "#000000"
  });

  this.funText = this.add.text(170, 20, "Fun: ", {
    font: "24px Arial",
    fill: "#000000"
  });
};

gameScene.refreshHud = function() {
  this.healthText.setText("Health: " + this.stats.health);
  this.funText.setText("Fun: " + this.stats.fun);
};

gameScene.updateStats = function(statDiff) {
  let isGameOver = false;

  for (stat in statDiff) {
    if (statDiff.hasOwnProperty(stat)) {
      this.stats[stat] += statDiff[stat];

      if (this.stats[stat] < 0) {
        isGameOver = true;
        this.stats[stat] = 0;
      }

      if (this.stats[stat] > 100) {
        this.stats[stat] = 100;
      }
    }
  }

  this.refreshHud();

  if (isGameOver) this.gameOver();
};

gameScene.gameOver = function() {
  this.uiBlocked = true;

  this.time.addEvent({
    delay: 2000,
    repeat: 0,
    callback: function() {
      this.scene.start("Home");
    },
    callbackScope: this
  });
};
