import Phaser from "phaser";
import Nest from "../nest";

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
		this.add.image(400, 300, "sky");

		const egg = this.physics.add.image(400, 150, "egg");
		egg.setDisplaySize(50, 50);
        egg.setBounce(0.2);
        egg.setCollideWorldBounds(true);
        
        const nests = this.physics.add.staticGroup()
		const nest1 = new Nest(this, 400, 200, "nest");
        nest1.setDisplaySize(100, 50);
        nest1.refreshBody()
        nest1.moveHorizontally()
        nests.add(nest1);

        // nest1.moveVertically()
        this.physics.add.collider(egg, nests, this.hitNests);
    }

    hitNests(egg, nest) {
            nest.lockedEgg = egg;
    }
}
