import * as PIXI from "pixi.js";
import Component from "../Component";

import ledOn from "../../assets/images/ledOn.png";
import ledOff from "../../assets/images/ledOff.png";

// led off http://www.clker.com/cliparts/M/h/R/9/8/H/red-led-on-hi.png
// led on http://www.clker.com/cliparts/z/r/p/I/x/a/green-led-on-hi.png
class Led extends Component {
    _status: boolean;
    sprite: PIXI.Sprite;

    constructor(defaultStatus: boolean = false) {
        const hitboxSize = 60;
        const hitbox = new PIXI.Circle(0, 0, hitboxSize);
        super(hitbox);
        

        this.sprite = PIXI.Sprite.from(ledOn);
        this.sprite.anchor.set(0.5);
        this.sprite.scale.set(0.2);
        this.addChild(this.sprite);


        this._status = defaultStatus;
        this.status = defaultStatus;

        this.addEventListener("pointerdown", (e) => {
            this.toggle();
        });

    }
    
    

    public get status() {
        return this._status;
    }
    public set status(newStatus: boolean) {
        
        console.log("turning led " + newStatus)
        if (newStatus) {
            this.sprite.texture = PIXI.Texture.from(ledOn);
        }
        else {
            this.sprite.texture = PIXI.Texture.from(ledOff);
        }
        this._status = newStatus;
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