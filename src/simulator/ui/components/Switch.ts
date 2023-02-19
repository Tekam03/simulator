import * as PIXI from "pixi.js";

class Switch extends PIXI.Graphics {
    status: boolean;
    callback: (status: boolean) => void;
    constructor(defaultStatus: boolean, callback: (status: boolean) => void) {
        super();
        this.status = defaultStatus;
        this.callback = callback;

        if (this.status) {
            this.tint = 0x22ff22;
        } 
        else {
            this.tint = 0xff0000;
        }


        // white foreground that changes color with tint
        this.beginFill(0xffffff, 1);
        this.lineStyle(2, 0x0, 1);
        this.drawRoundedRect(0, 0, 30, 30, 5);
        this.endFill();

    
        this.interactive = true;
        // this.eventMode = "static";


        this.on("pointerdown", () => {
            this.status = !this.status;
            if (this.status) {
                this.tint = 0x22ff22;
                this.callback(true);
            } 
            else {
                this.tint = 0xff0000;
                this.callback(false);
            }

        });
    }
}

export default Switch;
