let loadingScene = new Phaser.Scene("Loading");

loadingScene.preload = function() {
  let logo = this.add.sprite(this.sys.game.config.width / 2, 250, "logo");

  let bgBar = this.add.graphics();

  let barW = 150;
  let barH = 30;

  bgBar.setPosition(
    this.sys.game.config.width / 2 - barW / 2,
    this.sys.game.config.height / 2 - barH / 2
  );
  bgBar.fillStyle(0xf5f5f5, 1);
  bgBar.fillRect(0, 0, barW, barH);

  let progressBar = this.add.graphics();
  progressBar.setPosition(
    this.sys.game.config.width / 2 - barW / 2,
    this.sys.game.config.height / 2 - barH / 2
  );

  this.load.on(
    "progress",
    function(value) {
      progressBar.clear();

      progressBar.fillStyle(0x9ad98d, 1);

      progressBar.fillRect(0, 0, value * barW, barH);
    },
    this
  );

  this.load.image("backyard", "/images/home1.png");
  this.load.image("apple", "/images/apple.png");
  this.load.image("candy", "/images/candy.png");
  this.load.image("rotate", "/images/rotate.png");
  this.load.image("toy", "/images/chicken.png");

  this.load.image("pet", window.petData.image);
};

loadingScene.create = function() {
  this.scene.start("Home");
};
