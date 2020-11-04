import Phaser from "phaser";

export default class Nest2 extends Phaser.Physics.Matter.Image {
	/**
	 *
	 * @param {Phaser.Scene} scene
	 * @param {Number} x
	 * @param {Number} y
	 */
	constructor(scene, x, y, key) {
		super(scene.matter.world, x, y, key, 0, { isStatic: true });
		scene.add.existing(this);
		this.startX = x;
		this.startY = y;
		this.isMoving = false;
	}

	sync() {
		this.startX = this.x;
		this.startY = this.y;
		console.log(this.startX, this.startY);
	}

	move() {
		this.isMoving = true;
		this.scene.tweens.addCounter({
			from: -this.startX+ this.width,
			to:  this.scene.scale.width - this.width,
			duration: Phaser.Math.Between(1500, 6000),
			ease: Phaser.Math.Easing.Sine.InOut,
			repeat: -1,
			yoyo: true,
			onUpdate: (tween, target) => {
				const x = this.startX + target.value;
				const dx = x - this.x;
				this.x = x;
				this.setVelocityX(dx);
			},
		});
		const onUpdate = (tween, target) => {
			const x = this.startX + target.value;
			const dx = x - this.x;
			this.x = x;
			this.setVelocityX(dx);
		};

		
	}
}
