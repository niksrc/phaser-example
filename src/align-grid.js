export default class AlignGrid {
	/**
	 *
	 * @typedef {{ scene: Phaser.Scene, rows: Number?, cols: Number?, width: Number, height: Number }} SpecialType
	 * @param {SpecialType} config
	 */
	constructor(config) {
		if (!config.rows) {
			config.rows = 3;
		}
		if (!config.cols) {
			config.cols = 3;
		}

		this.height = config.height;
		this.width = config.width;
		this.rows = config.rows;
		this.cols = config.cols;
		this.scene = config.scene;

		//cw cell width is the scene width divided by the number of columns
		this.cw = this.width / this.cols;
		//ch cell height is the scene height divided the number of rows
		this.ch = this.height / this.rows;
	}

	debug(a = 1) {
		this.graphics = this.scene.add.graphics().setScrollFactor(1, 0);
		this.graphics.lineStyle(4, 0xff0000, a);
		//
		//
		//this.graphics.beginPath();
		for (var i = 0; i < this.width; i += this.cw) {
			this.graphics.moveTo(i, 0);
			this.graphics.lineTo(i, this.height);
		}
		for (var i = 0; i < this.height; i += this.ch) {
			this.graphics.moveTo(0, i);
			this.graphics.lineTo(this.width, i);
		}
		this.graphics.strokePath();
	}

	showNumbers(a = 1) {
		this.debug(a);
		var n = 0;
		for (var i = 0; i < this.rows; i++) {
			for (var j = 0; j < this.cols; j++) {
				var numText = this.scene.add
					.text(0, 0, "" + n, {
						color: "red",
					})
					.setScrollFactor(1, 0);
				numText.setOrigin(0.5, 0.5);
				this.placeAt(j, i, numText);
				n++;
			}
		}
	}

	/**
	 *
	 * @param {Number} xx
	 * @param {Number} yy
	 * @param {Phaser.GameObjects.Components.Transform} obj
	 */
	placeAt(xx, yy, obj) {
		//calculate the center of the cell
		//by adding half of the height and width
		//to the x and y of the coordinates
		var x2 = this.cw * xx + this.cw / 2;
		var y2 = this.ch * yy + this.ch / 2;
		obj.x = x2;
		obj.y = y2;
	}

	/**
	 *
	 * @param {Number} index
	 * @param {Phaser.GameObjects.Components.Transform} obj
	 */
	placeAtIndex(index, obj) {
		var yy = Math.floor(index / this.cols);
		var xx = index - yy * this.cols;
		this.placeAt(xx, yy, obj);
	}
}
