import * as PIXI from "pixi.js";
import Component from "../Component";
import Pin from "./Pin";

import ledOn from "../../assets/images/ledOn.png";
import ledOff from "../../assets/images/ledOff.png";

// led off http://www.clker.com/cliparts/M/h/R/9/8/H/red-led-on-hi.png
// led on http://www.clker.com/cliparts/z/r/p/I/x/a/green-led-on-hi.png
class Switch extends Component {
    _status: boolean;
    sprite: PIXI.Sprite;
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
        this.pinPlus.position.set(60, 0);  
        

        this.addChild(this.pinPlus);

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
        this.pinPlus.connectingMode = newMode;
    }

    public get status() {
        return this._status;
    }
    public set status(newStatus: boolean) {
        
        if (this.parent) {
            this.parent.children.forEach((component) => {
                if (component instanceof Component) {
                    component.children.forEach((child) => {
                        if(child instanceof Pin) {
                            child.status = false;
                        }
                    });
                }
            });
        }

        // console.log("turning led " + newStatus)
        if (newStatus) {
            this.sprite.texture = PIXI.Texture.from(ledOn);
        }
        else {
            this.sprite.texture = PIXI.Texture.from(ledOff);
        }
        this._status = newStatus;
        if (this.pinPlus) {
            this.pinPlus.status = newStatus;
        }

    }

    calculate() {
        // console.log("led calculate");
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
    

export default Switch;