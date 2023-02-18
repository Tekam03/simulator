import * as PIXI from "pixi.js";

/**
 * The Background object is used to draw the background grid of the canvas
 */
class Background extends PIXI.Container {

    lines: PIXI.Graphics;
	gridSize: number; // grid size in number of pixels between lines
	bigLines: number; // amount of pixels between bigger lines

    constructor(size: number) {
        super();

        this.x=-size/2;
        this.y=-size/2;
        this.width = size;
        this.height = size;
            

        this.gridSize = 100;
        this.bigLines = this.gridSize * 5;

        this.lines = new PIXI.Graphics();
        this.lines.lineStyle(2, 0xaaaaaa, 1);

        // draw horizontal lines
        for (let i = 0; i <= size; i += this.gridSize) {
            this.lines.moveTo(0, i);
            this.lines.lineTo(size, i);
        }

        // draw vertical lines
        for (let i = 0; i <= size; i += this.gridSize) {
            this.lines.moveTo(i, 0);
            this.lines.lineTo(i, size);
        }

        this.lines.lineStyle(5, 0xaaaaaa, 1); // big lines
        // draw big horizontal lines
        for (let i = 0; i <= size; i += this.bigLines) {
            this.lines.moveTo(0, i);
            this.lines.lineTo(size, i);
        }

        // draw big vertical lines
        for (let i = 0; i <= size; i += this.bigLines) {
            this.lines.moveTo(i, 0);
            this.lines.lineTo(i, size);
        }


        this.addChild(this.lines);

    }
}

export default Background;