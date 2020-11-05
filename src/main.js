import Phaser from "phaser";
import HomeScene from "./scenes/home";
import GameScene from "./scenes/game";

export default new Phaser.Game({
	type: Phaser.AUTO,

	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 400, x: 0 },
			// debug: true,
		},
	},
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
	scene: [GameScene, HomeScene],
});
