import * as PIXI from "pixi.js";
import Camera from "../core/Camera";
import Button from "./components/Button";
import Switch from "./components/Switch";


class DebugMenu extends PIXI.Graphics {
    active: boolean;
    constructor() {
        super();
        this.active = true;
        this.x = 10;
        this.y = 10;
        this.interactive = true;

        this.openMenu();       
    }

    // show debug menu
    openMenu() {
        this.active = true;
        this.removeChildren();
        this.clear();

        this.drawOpenCloseSwitch();
        
        // draw background
        this.beginFill(0xffffff, 0.95);
        this.drawRoundedRect(0, 0, 300, 500, 10);
        this.endFill();

        
        // Title
        const Title = new PIXI.Text('Debug Menu', {
            fontSize: 30,
            fontWeight: 'bold',
            fill: 0x000000,
            align: 'center',
        });
        Title.anchor.set(0.5);
        Title.x = this.width/2;
        Title.y = 20;
        this.addChild(Title);


        // Camera
        const CameraHitBoxButton = new Switch(false, (status) => {
            const camera = this.parent.parent.getChildByName('Camera', true) as Camera
            if (status) {
                camera.drawHitbox();
            }
            else {
                camera.removeHitbox();
            }
        });
        CameraHitBoxButton.x = 10;
        CameraHitBoxButton.y = 60;
        this.addChild(CameraHitBoxButton);

        const CameraHitBoxLabel = new PIXI.Text('Show Camera Hitbox', {
            fontSize: 15,
            fontWeight: 'bold',
            fill: 0x000000,
            align: 'center',
        });
        CameraHitBoxLabel.anchor.set(0.5);
        CameraHitBoxLabel.x = this.width/2;
        CameraHitBoxLabel.y = 60;
        this.addChild(CameraHitBoxLabel);
    }

    // not used anywhere
    closeMenu() {
        this.active = false;
        this.removeChildren();
        this.destroy();
    }

    // show only the switch
    shortMenu() {
        this.active = false;
        this.removeChildren();
        this.clear();
        this.drawOpenCloseSwitch();
    }

    drawOpenCloseSwitch() {
        // Open/Close Switch
        const OpenCloseSwitch = new Switch(this.active, (status) => {
            if (status) {
                this.openMenu();
            }
            else {
                this.shortMenu();
            }
        });
        OpenCloseSwitch.x = 10;
        OpenCloseSwitch.y = 10;
        this.addChild(OpenCloseSwitch);
    }
        
}

export default DebugMenu;