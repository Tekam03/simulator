import * as PIXI from "pixi.js";

class Component extends PIXI.Container {

    _hitbox: PIXI.Rectangle;
    _hitboxGraphic: PIXI.Graphics;
    constructor(hitbox: PIXI.Rectangle) {
        super();
        this._hitbox = hitbox;
        this._hitboxGraphic = new PIXI.Graphics();
        this._hitboxGraphic.zIndex = 1000;

        this.eventMode = "static";
        this.sortableChildren = true;
        this.hitArea = this._hitbox;
        
        this.addChild(this._hitboxGraphic);


        this.addEventListener("pointerdown", () => {
            console.log("pointerdown");
        });
    }

    showHitbox() {
        this._hitboxGraphic.beginFill(0xff0000, 0.5);
        this._hitboxGraphic.drawRect(this._hitbox.x, this._hitbox.y, this._hitbox.width, this._hitbox.height);
        this._hitboxGraphic.endFill();
    }

    removeHitbox() {
        this._hitboxGraphic.clear();
    }

}

export default Component;