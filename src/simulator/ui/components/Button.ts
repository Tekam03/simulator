import * as PIXI from "pixi.js";

class Button extends PIXI.Graphics {
    constructor() {
        super();
        this.beginFill(0xffffff, 0.9);
        this.drawRect(0, 0, 300, 500);
        this.endFill();
    }
}

export default Button;