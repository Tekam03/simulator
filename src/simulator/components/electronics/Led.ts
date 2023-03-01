import * as PIXI from "pixi.js";
import Component from "../Component";
import Pin from "./Pin";

import ledOn from "../../assets/images/ledOn.png";
import ledOff from "../../assets/images/ledOff.png";

// led off http://www.clker.com/cliparts/M/h/R/9/8/H/red-led-on-hi.png
// led on http://www.clker.com/cliparts/z/r/p/I/x/a/green-led-on-hi.png
class Led extends Component {
    _status: boolean;
    sprite: PIXI.Sprite;
    pinMinus: Pin;
    pinPlus: Pin;

    constructor(defaultStatus: boolean = false) {


        super();
        

        this.sprite = PIXI.Sprite.from(ledOn);
        this.sprite.anchor.set(0.5);
        this.sprite.scale.set(0.2);
        this.sprite.interactive = true;
        this.sprite.hitArea = new PIXI.Circle(0, 0, 300);
        this.addChild(this.sprite);


        this._status = defaultStatus;
        this.status = defaultStatus;

        this.pinPlus = new Pin();
        this.pinPlus.position.set(-60, 0);  
        
        this.pinMinus = new Pin();
        this.pinMinus.position.set(60, 0);

        this.addChild(this.pinPlus);
        this.addChild(this.pinMinus);

        this.addEventListener("click", (e) => {
            this.toggle();
        });

    }
    
    showHitbox() {
        this.sprite.tint = 0xff0000;
    }

    hideHitbox() {
        this.sprite.tint = 0xffffff;
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

    public get status() {
        return this._status;
    }
    public set status(newStatus: boolean) {
        
        // console.log("turning led " + newStatus)
        if (newStatus) {
            this.sprite.texture = PIXI.Texture.from(ledOn);
        }
        else {
            this.sprite.texture = PIXI.Texture.from(ledOff);
        }
        this._status = newStatus;
    }

    calculate() {
        // console.log("led calculate");
        this.status = this.pinPlus.status;
        this.pinMinus.status = this.pinPlus.status;
        // if (this.pinPlus.connectedWire) {
        //     if (this.pinPlus.connectedWire.status) {
        //         this.status = true;
        //     }
        // }
    }

    public turnOff() {
        this.status = false;
    }

    public turnOn() {
        this.status = true;
    }

    public toggle() {
        this.status = !this.status;
    }
}
    

export default Led;