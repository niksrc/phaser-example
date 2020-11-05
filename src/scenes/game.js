import Phaser from "phaser";

const TOTAL_NESTS = 3;

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
		// Set background
		this.add.image(400, 200, "sky").setScrollFactor(0, 0);

		// Set world bounds, so that we can move up infinite times,
		// and have collisions on left and right boundaries
		this.physics.world.setBounds(
			100,
			0,
			this.game.scale.width - 200,
			this.game.scale.height,
			true,
			true,
			false,
			false
		);

		// We manage our own arcade image array, as i coudn't get physics group
		// working with moving nests.
		/** @type Phaser.Physics.Arcade.Image[] */
		this.nests = [];
		for (let i = 0; i < TOTAL_NESTS; ++i) {
			const nest = this.physics.add.image(0, 0, "nest");
			const bottomNestIndex = TOTAL_NESTS - 1;
			// We want first nest to be at the bottom center in the beginning

			// DEBUG: set all nests at center:
			// nest.x = this.game.scale.width / 2;
			nest.x =
				i === bottomNestIndex
					? this.game.scale.width / 2
					: Phaser.Math.Between(100, this.game.scale.width - 100);
			nest.y =
				((i + 1) * this.game.scale.height) / TOTAL_NESTS -
				this.game.scale.height / (2 * TOTAL_NESTS);

			nest
				.setDisplaySize(100, 50)
				.setImmovable(true)
				.setBounce(1, 0)
				.setGravity(0, 0)
				.setCollideWorldBounds(true);

			nest.body.setAllowGravity(false);

			if (i !== bottomNestIndex) {
				nest.setVelocityX(
					Phaser.Math.Between(100, 180)
				);
			}

			this.nests.push(nest);
		}

		const egg = this.physics.add.image(0, 0, "egg");
		egg.setDisplaySize(50, 50);
		const startingNest = this.nests[TOTAL_NESTS - 1].getTopCenter();
		egg.x = startingNest.x;
		egg.y = startingNest.y - 40;

		// Only collision with nest matters is when egg bottom hits the nest
		egg.body.checkCollision.up = false;
		egg.body.checkCollision.left = false;
		egg.body.checkCollision.right = false;
		egg.setVelocityX(0);

		// Egg Jump Action
		this.input.on("pointerdown", (pointer) => {
			egg.setVelocityY(-500);
			egg.setVelocityX(0);
		});

		// Enable collision with nest and egg
		this.physics.add.collider(
			egg,
			this.nests,
			this.hitNests.bind(this),
			null,
			this
		);

	}

	/**
	 *
	 * @param {Phaser.Physics.Arcade.Image} egg
	 * @param {Phaser.Physics.Arcade.Image} nest
	 */
	hitNests(egg, nest) {
		if (!nest.hit) {
			setTimeout(() => {
				this.lastLocked = nest;
			}, 100);

			// Move egg to center
			// const coords = nest.getTopCenter();
			// if (coords.x != egg.x) {
			//     this.physics.moveTo(egg, coords.x, egg.y);
			// }
			nest.hit = true;
		}
	}

	update() {
		if (
			this.lastLocked &&
			this.lastLocked.y <=
				this.cameras.main.scrollY + this.cameras.main.height / (TOTAL_NESTS * 2)
		) {
			// console.log({
			// 	cameraScrollY: this.cameras.main.scrollY,
			// 	height: this.game.scale.height,
            //     gridY: this.game.scale.height / TOTAL_NESTS,
            //     val : this.cameras.main.scrollY - this.game.scale.height / (TOTAL_NESTS * 2),
			// });
			// Scroll camera upwards smoothly
			this.cameras.main.pan(
				this.cameras.main.width / 2,
				this.cameras.main.scrollY - this.game.scale.height / (TOTAL_NESTS * 2),
				// this.cameras.main.scrollY - this.lastLocked.y * 2,
				// 2 * this.game.scale.height / (TOTAL_NESTS) ,
				// (TOTAL_NESTS - 1) * (this.cameras.main.height) / TOTAL_NESTS,
				// (2 * TOTAL_NESTS - 1) * (this.cameras.main.height) / (2 * TOTAL_NESTS),
				1000
			);

			this.nests
				.filter((nest) => Boolean(this.lastLocked.y != nest.y))
				.reverse()
				.forEach((nest, i, nests) => {
					// DEBUG: set all nests at center:
					// nest.x =  this.game.scale.width / 2;

					// reset nest state
					nest.hit = false;
					nest.x = this.game.scale.width / 2;

					nest.x = Phaser.Math.Between(100, this.game.scale.width - 100);
					nest.y =
						this.lastLocked.y -
						((i + 1) * this.game.scale.height) / TOTAL_NESTS;
					console.log(i, nest.x, nest.y);
					// Set velocity
					// Maintain invariant that no two consecutive non moving nests should exists

					if (
						this.lastLocked.body.velocity.x ||
						(nests[i - 1] && nests[i - 1].body.velocity.x) ||
						Phaser.Math.Between(0, 1)
					) {
					} else {
						// Debug: disable velocity
						nest.setVelocityX(Phaser.Math.Between(80, 500));
					}
				});
		}
	}
}
