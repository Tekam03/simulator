import * as PIXI from "pixi.js";

class Component extends PIXI.Container {

    _hitbox: PIXI.IHitArea;
    _hitboxGraphic: PIXI.Graphics;
    constructor(hitbox: PIXI.IHitArea) {
        super();
        this._hitbox = hitbox;  // actual hitbox (invisible to the eye with event listeners)
        this._hitboxGraphic = new PIXI.Graphics(); // hitbox graphic (visible to the eye for debugging)
        this._hitboxGraphic.zIndex = 1000;

        // this.eventMode = "static";
        this.interactive = true;
        this.sortableChildren = true;
        this.hitArea = this._hitbox;
        
        this.addChild(this._hitboxGraphic);


        this.addEventListener("pointerdown", (e) => {
            e.stopPropagation();
            console.log("pointerdown");
        });
    }

    showHitbox() {
        this._hitboxGraphic.beginFill(0xff0000, 0.5);
        if(this._hitbox instanceof PIXI.Rectangle) { // if hitbox is a rectangle type
            this._hitboxGraphic.drawRect(this._hitbox.x, this._hitbox.y, this._hitbox.width, this._hitbox.height);
        } else if(this._hitbox instanceof PIXI.Circle) { // if hitbox is a circle type
            this._hitboxGraphic.drawCircle(this._hitbox.x, this._hitbox.y, this._hitbox.radius);
        } else if(this._hitbox instanceof PIXI.Polygon) { // if hitbox is a circle type
            this._hitboxGraphic.drawPolygon(this._hitbox.points);
        }
        this._hitboxGraphic.endFill();
    }

    hideHitbox() {
        this._hitboxGraphic.clear();
    }

}

export default Component;