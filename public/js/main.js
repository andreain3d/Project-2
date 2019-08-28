let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  scene: [bootScene, loadingScene, homeScene, gameScene],
  title: "Virtual Pet",
  pixelArt: false,
  backgroundColor: "ffffff"
};

let game = new Phaser.Game(config);
