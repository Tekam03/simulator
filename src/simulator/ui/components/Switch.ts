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


        // black border
        this.beginFill(0x000000, 1);
        this.drawRoundedRect(-2, -2, 34, 34, 5);
        this.endFill();


        // white foreground that changes color with tint
        this.beginFill(0xffffff, 1);
        this.drawRoundedRect(0, 0, 30, 30, 5);
        this.endFill();

    
        this.interactive = true;

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
