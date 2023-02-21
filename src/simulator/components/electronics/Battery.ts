import * as PIXI from "pixi.js";
import Component from "../Component";

import Pin from "./Pin";

import batteryImg from "../../assets/images/battery.png";

class Battery extends Component {
    batteryImg: PIXI.Sprite;
    pinPlus: Pin;
    pinMinus: Pin;

    constructor(defaultStatus: boolean = false) {
        // const hitboxSize = 60;
        // const hitbox = new PIXI.Rectangle(-100, -65, 210, 130);
        super();
        

        this.batteryImg = PIXI.Sprite.from(batteryImg);
        this.batteryImg.anchor.set(0.5);
        this.batteryImg.scale.set(0.5);
        this.batteryImg.rotation = 0.5 * Math.PI;
        this.addChild(this.batteryImg);

        this.pinPlus = new Pin();
        this.pinPlus.position.set(100, 30);  
        this.pinPlus.status = true;
        
        this.pinMinus = new Pin();
        this.pinMinus.position.set(100, -30);

        this.addChild(this.pinPlus);
        this.addChild(this.pinMinus);


    }
    
    showHitbox() {
        this.batteryImg.tint = 0xff0000;
    }

    hideHitbox() {
        this.batteryImg.tint = 0xffffff;
    }

    // false : normal, true : connecting
    setPinMode(newMode: boolean) {
        if (newMode) {
            this.pinPlus.connectingMode = true;
            this.pinMinus.connectingMode = true;
        }
        else {
            this.pinPlus.connectingMode = false;
            this.pinMinus.connectingMode = false;
        }
    }

    calculate() {
        this.pinPlus.status = true;
        this.pinMinus.status = false;
    }


}
    

export default Battery;