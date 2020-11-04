import Phaser from "phaser";
import Nest from "../nest";
import AlignGrid from "../align-grid";

export default class GameScene extends Phaser.Scene {
	constructor() {
		super("game");
	}

	preload() {
		this.load.image("sky", "512.jpg");
		this.load.image("egg", "PNG/Props/Prop_1.png");
		this.load.image("nest", "PNG/Pads/Pad_02_1.png");
	}

	create() {
		// Set background image
		this.add.image(400, 200, "sky").setScrollFactor(1, 0);

		const grid = new AlignGrid({
			scene: this,
			cols: 3,
			rows: 3,
			width: this.cameras.default.width,
			height: this.cameras.default.height,
		});

		grid.showNumbers();
		const egg = this.matter.add.image(0, 0, "egg");
		egg.setDisplaySize(50, 50);
		egg.setVelocity(0);
		grid.placeAtIndex(4, egg);
		this.cameras.main.setDeadzone(this.scale.width * 1.5)
		this.cameras.main.startFollow(egg)
		this.input.on("pointerdown", function (pointer) {
			if (pointer.y > 300) {
				egg.setVelocity(0, -20);
			} else if (pointer.x < 400) {
				egg.setVelocityX(-8);
			} else {
				egg.setVelocityX(8);
			}
		});

		this.nests = [];
		for (let i = 0; i < 5; ++i) {
			const index = i === 2 ? 7 : Phaser.Math.Between(3 * i, 3 * i + 2);
			const nest = new Nest(this, 0, 0, "nest");
			nest.setDisplaySize(100, 50);
			grid.placeAtIndex(index, nest);
			nest.sync();
			// Maintain invariant that no two consecutive non moving nests
			if (
				i === 2 ||
				(i > 0 && this.nests[i - 1].isMoving && Math.random() * 2 < 1)
			) {
			} else {
				nest.move();
			}

			if (i > 3) {
				nest.setVisible(false);
			}

			this.nests.push(nest);
		}

		// const nest1 = new Nest(this, 700, 650, "nest");

		// nest1.setDisplaySize(100, 50);
		// nest1.moveHorizontally();

		// const nest3 = new Nest(this, 500, 450, "nest");
		// nest3.setDisplaySize(100, 50);
		// nest3.moveHorizontally();

		// const nest4 = new Nest(this, 700, 250, "nest");
		// nest4.setDisplaySize(100, 50);
		// nest4.moveHorizontally();

		// const nest2 = new Nest(this, 500, 150, "nest");
		// nest2.setDisplaySize(100, 50);
		// nest2.moveHorizontally();

		// nests.add(nest1);

		// nest1.moveVertically()
		// this.matter.col(egg, nest1);
	}

	hitNests(egg, nest) {
		nest.lockedEgg = egg;
	}
}
