import Phaser from "phaser";

export default class Nest extends Phaser.Physics.Arcade.Image {
	/**
	 *
	 * @param {Phaser.Scene} scene
	 * @param {Number} x
	 * @param {Number} y
	 */
	constructor(scene, x, y, key) {
		super(scene, x, y, key);

        scene.add.existing(this);
        scene.physics.add.existing(this, true);
        this.startX = x;
        this.startY = y;
	}

	moveVertically() {
		this.scene.tweens.addCounter({
			from: 0,
			to: -200,
			duration: 1500,
			ease: Phaser.Math.Easing.Sine.InOut,
			repeat: -1,
			yoyo: true,
			onUpdate: (tween, target) => {
				const y = this.startY + target.value;
                const dy = y - this.y;
                this.y = y;
                this.body.y = this.body.y + dy
			},
		});
    }
    
    moveHorizontally() {
		this.scene.tweens.addCounter({
			from: 0,
			to: -200,
			duration: 1500,
			ease: Phaser.Math.Easing.Sine.InOut,
			repeat: -1,
			yoyo: true,
			onUpdate: (tween, target) => {
				const x = this.startX + target.value;
				const dx = x - this.x;
                this.x = x;
                this.body.x = this.body.x + dx
			},
		});
	}
}
