let gameScene = new Phaser.Scene("Game");

gameScene.init = function() {};

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
};

gameScene.createUi = function() {
  this.appleBtn = this.add.sprite(180, 30, "apple").setInteractive();

  this.appleBtn.on("pointerdown", this.pickItem);

  this.candyBtn = this.add.sprite(245, 30, "candy").setInteractive();

  this.candyBtn.on("pointerdown", this.pickItem);

  this.carrotBtn = this.add.sprite(320, 30, "carrot").setInteractive();

  this.carrotBtn.on("pointerdown", this.pickItem);

  this.buttons = [this.appleBtn, this.candyBtn, this.carrotBtn];

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

      this.uiReady();
    }
  });
};
