import * as PIXI from "pixi.js";

abstract class Component extends PIXI.Container {

    _pinsConnectingMode: boolean;
    constructor() {
        super();
        this._pinsConnectingMode = false;
        // this.eventMode = "static";
        this.interactive = true;
        this.sortableChildren = true;
        // this.hitArea = this._hitbox;
        
        // this.addChild(this._hitboxGraphic);


        this.addEventListener("pointerdown", (e) => {
            e.stopPropagation();
            console.log("pointerdown");
        });
    }

    abstract showHitbox() : void;
    //     this._hitboxGraphic.beginFill(0xff0000, 0.5);
    //     if(this._hitbox instanceof PIXI.Rectangle) { // if hitbox is a rectangle type
    //         this._hitboxGraphic.drawRect(this._hitbox.x, this._hitbox.y, this._hitbox.width, this._hitbox.height);
    //     } else if(this._hitbox instanceof PIXI.Circle) { // if hitbox is a circle type
    //         this._hitboxGraphic.drawCircle(this._hitbox.x, this._hitbox.y, this._hitbox.radius);
    //     } else if(this._hitbox instanceof PIXI.Polygon) { // if hitbox is a circle type
    //         this._hitboxGraphic.drawPolygon(this._hitbox.points);
    //     }
    //     this._hitboxGraphic.endFill();
    // }

    abstract hideHitbox() : void;
    //     this._hitboxGraphic.clear();
    // }

    abstract setPinMode(newMode: boolean): void;

    abstract calculate() : void;

}

export default Component;