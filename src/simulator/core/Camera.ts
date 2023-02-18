import * as PIXI from "pixi.js";

class Camera extends PIXI.Graphics {
    // interactive
    _hitboxsize: number;
    _clicking: boolean;
    _previousPositionX: number;
    _previousPositionY: number;
    constructor(movingCanvas: PIXI.Container) {
        super();
        this.name = "Camera";
        this.interactive = true;
        this._hitboxsize = 10000;
        this.hitArea = new PIXI.Rectangle(
            -this._hitboxsize,
            -this._hitboxsize,
            this._hitboxsize * 2,
            this._hitboxsize * 2
        );


        this._clicking = false;
        this._previousPositionX = 0;
        this._previousPositionY = 0;

        this.addEventListener("mousedown", (event) => {
            // this._previousPositionX = app.stage.x - event.global.x
            this._previousPositionX = event.global.x - movingCanvas.x;
            this._previousPositionY = event.global.y - movingCanvas.y;
            this._clicking = true;
        });

        this.addEventListener("mouseup", (event) => {
            this._clicking = false;
        });

        this.addEventListener("mousemove", (event) => {
            if (this._clicking) {
                // if (this.mouseIsInsideCanvas(event, app)) {
                    movingCanvas.y = event.global.y - this._previousPositionY
                    movingCanvas.x = event.global.x - this._previousPositionX
                // }
            }
        });
    }

    drawHitbox() {
        this.beginFill(0xffffff, 0.5);
        this.drawRect(-this._hitboxsize, -this._hitboxsize, this._hitboxsize * 2, this._hitboxsize * 2)
        this.endFill();
    }

    removeHitbox() {
        this.clear();
    }



    // mouseIsInsideCanvas(
    //     event: PIXI.FederatedPointerEvent,
    //     app: PIXI.Application
    // ) {
    //     // if mouse is inside the canvas
    //     if (
    //         event.global.x > 0 &&
    //         event.global.x < app.screen.width &&
    //         event.global.y > 0 &&
    //         event.global.y < app.screen.height
    //     ) {
    //         return true;
    //     }
    //     return false;
    // }
}

export default Camera;
