let bootScene = new Phaser.Scene("Boot");

bootScene.preload = function() {
  this.load.image("logo", "/images/logo.png");
};

bootScene.create = function() {
  this.scene.start("Loading");
};
