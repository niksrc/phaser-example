import Phaser from "phaser";

export default class HomeScene extends Phaser.Scene {
	constructor() {
		super("home");
	}

	preload() {
		this.load.image("sky", "512.jpg");
	}

	create() {
		// Set background image
		this.add.image(
			this.cameras.main.width,
			this.cameras.main.height / 2,
			"sky"
		);

		const screenCenterX =
			this.cameras.main.worldView.x + this.cameras.main.width / 2;
		const screenCenterY =
			this.cameras.main.worldView.y + this.cameras.main.height / 2;

		// Game title
		this.add
			.text(screenCenterX, screenCenterY, "", {
				font: "32px Monospace",
				fill: "#ffffff",
			})
			.setOrigin(0.5)
			.setText(["Jump"]);

		// Start Button
		this.add
			.text(screenCenterX, screenCenterY + 50, "", {
				font: "32px Monospace",
				fill: "#ffffff",
			})
			.setOrigin(0.5)
			.setText(["Click To Start"])
			.setInteractive()
			.on("pointerdown", () => {
				this.scene.start("game");
			});
	}
}
