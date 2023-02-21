import * as PIXI from "pixi.js";
import Wire from "./Wire";
import Component from "../Component";


class Pin extends PIXI.Graphics {
    _status: boolean;
    connectedWire: Wire | null;
    _connectingMode: boolean;

    constructor() {
        super();

        this.cursor = "pointer";

        this.beginFill(0xffffff);
        this.tint = 0x000000;
        this.drawCircle(0, 0, 10);
        this.endFill();

        this.hitArea = new PIXI.Circle(0, 0, 10);
        
        this._status = false;
        this.status = false;
        this.connectedWire = null;
        this._connectingMode = false;


        this.interactive = true;

        // this.on("mouseenter", (e) => {
        //     e.stopPropagation();
        //     this.tint = 0xff0000;
        //     // console.log("mouse enter");
        //     // change cursor
        // });

    
        this.on("click", (e) => {

            e.stopPropagation();  

            // remove current wire
            if (this.connectedWire) {  
                this.connectedWire.destroy();
            }


            // if dragging a wire
            if (this.connectingMode) {

                // remove connecting mode from all pins
                this.parent.parent.children.forEach((child) => {
                    if (child instanceof Component) {
                        child.setPinMode(false);
                    }
                });

                // stop draging wire
                this.parent.parent.off("pointermovecapture");

                // link new wire
                this.parent.parent.children.forEach((child) => {
                    if (child instanceof Wire && child.editing) {
                        child.pin2 = this;
                        child.editing = false;
                        
                        this.connectedWire = child;


                    }
                });
            }

            // if not dragging a wire
            else {

                // set all pins to connecting mode
                this.parent.parent.children.forEach((child) => {
                    if (child instanceof Component) {
                        child.setPinMode(true);
                    }
                });

                // create a new wire and link it to this pin
                this.connectedWire = new Wire(this);
                
                this.parent.parent.addChild(this.connectedWire); // add wire to moving canvas
            }         
            

    
        });



        // this.on("mouseleave", (e) => {
        //     e.stopPropagation();
        //     this.tint = 0x000000;
        //     console.log("mouse leave");
        // });
    }  
    
    

    public get connectingMode() {
        return this._connectingMode;
    }
    public set connectingMode(newMode: boolean) {
        if (newMode) {
            this.tint = 0xffffff;
        }
        else {
            this.status = this._status;
        }
        // this.tint = newMode ? 0xffffff : 0x000000;
        this._connectingMode = newMode;
    }

    public get status() {
        return this._status;
    }
    public set status(newStatus: boolean) {
        this.tint = newStatus ? 0xff0000 : 0x000000;
        if (newStatus == this._status) return;
        this._status = newStatus;
        
        console.log("turning pin " + newStatus)
        if (this.connectedWire) {
            // this.connectedWire.status = newStatus;
            this.connectedWire.calculate();
        }

        // if (this.parent) {
        //     let parent = this.parent as Component;
        //     parent.calculate();
        // }
    }

}
    

export default Pin;