import * as PIXI from "pixi.js";
import Component from "../Component";

import Pin from "./Pin";

import arduinoImg from "../../assets/images/arduino.png";

class Arduino extends PIXI.Container {
    arduinoImg: PIXI.Sprite;


    constructor(defaultStatus: boolean = false) {
        // const hitboxSize = 60;
        // const hitbox = new PIXI.Rectangle(-100, -65, 210, 130);
        super();
        

        this.arduinoImg = PIXI.Sprite.from(arduinoImg);
        this.arduinoImg.anchor.set(0.5);
        this.arduinoImg.scale.set(0.3);
        this.addChild(this.arduinoImg);

        


    }
    
    showHitbox() {
        this.arduinoImg.tint = 0xff0000;
    }

    hideHitbox() {
        this.arduinoImg.tint = 0xffffff;
    }



}
    

export default Arduino;