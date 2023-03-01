import * as PIXI from "pixi.js";
import Component from "../Component";
import Pin from "./Pin";


class Wire extends PIXI.Graphics {
    _status: boolean;
    editing: boolean;
    lineSize : number;
    lineColor : number;
    _points : number[];

    _pin1: Pin;
    _pin2: Pin | null;
    constructor(pin1: Pin, lineSize: number = 5, lineColor: number = 0x000000) {
        super();
        this._pin1 = pin1;
        this._pin2 = null;
        this._status = false;
        this.editing = true;
        this.lineSize = lineSize;
        this.lineColor = lineColor;

        let x = pin1.x + pin1.parent.x;
        let y = pin1.y + pin1.parent.y;
        
        this._points = [x, y, x, y];

        this.lineStyle(this.lineSize, this.lineColor)

        this.beginFill(0xffffff);
        this.lineColor = 0xffffff;
        this.tint = 0x000000;
        this.drawCircle(0, 0, 10);
        this.endFill();

        this.moveTo(this._points[0], this._points[1]);
        this.lineTo(this._points[2], this._points[3]);

        // TODO REDO EVENT LISTENERS
            
        this.on("added", (e) => {

            // this.parent.children.forEach((child) => {
            //     if (child instanceof Component) {
            //         child.setPinMode(true);
            //     }
            // });

            this.status = this._pin1.status;

            this.parent.on("pointermovecapture", (e) => {
                let {x, y} = this.toLocal(e.global);
                this.points = [this._points[0], this._points[1], x, y];
            }, );

            // this.parent.addEventListener("click", (e) => {
                
            //     if (this.parent) {// if not deleted

            //         console.log("click")

            //         // this.parent.children.forEach((child) => {
            //         //     if (child instanceof Component) {
            //         //         child.setPinMode(false);
            //         //     }
            //         // });
            //         // this.parent.off("pointermovecapture");
            //     }
                
            // }, {once: true });
        });

        this.on("destroyed", () => {
            // remove the wire from the pins that are connected to it
            this._pin1.connectedWire = null;
            if (this.pin2) {
                this.pin2.connectedWire = null;

            }
        });
        

    }
    
    public get points() {
        return this._points;
    }

    public set points(points: number[]) {
        
        this._points = points;
        
        this.clear();
        this.lineStyle(this.lineSize, this.lineColor);
        this.moveTo(this._points[0], this._points[1]);
        this.lineTo(this._points[2], this._points[3]);
    }
    

    public set pin1(newPin: Pin) {
        if (newPin) {
            this._points[0] = newPin.x + newPin.parent.x;
            this._points[1] = newPin.y + newPin.parent.y;
            this.points = this._points;
        }
        this._pin1 = newPin;
    }

    public get pin1() {
        return this._pin1;
    }


    public set pin2(newPin: Pin | null) {
        if (newPin) {
            this._points[2] = newPin.x + newPin.parent.x;
            this._points[3] = newPin.y + newPin.parent.y;
            this.points = this._points;

            // newPin.status = this.status;
        }
        this._pin2 = newPin;
    }

    public get pin2() {
        return this._pin2;
    }

    public get status() {
        return this._status;
    }
    public set status(newStatus: boolean) {
        // if (this.pin2) {
        //     this.status = this.pin2.status || this.pin1.status;
        //     this.pin1.status = this.status;
        //     this.pin2.status = this.status;
        // }
        //  ? this.tint = 0x000000 : this.tint = 0xff0000;
        if (newStatus) {
            this.tint = 0xff0000;
            
        }
        else {
            this.tint = 0x000000;
        }
        
        // console.log("turning wire " + newStatus)


        this._status = newStatus;
    }

    calculate(currentPin: Pin) {
        // console.log("quelque chose d'autre")
        if (this.pin2) {
            this.status = currentPin.status;
            
            if (currentPin === this.pin1) {
                this.pin2.status = this.status;

                if(this.pin2.parent instanceof Component) {
                    this.pin2.parent.calculate();
                }
            } else {
                this.pin1.status = this.status;
                if(this.pin1.parent instanceof Component) {
                    this.pin1.parent.calculate();
                }
            }
        }
    }
}
    

export default Wire;