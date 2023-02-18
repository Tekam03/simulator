import * as PIXI from "pixi.js";
import Component from "../../components/Component";
import Camera from "../../core/Camera";
import Button from "../components/Button";
import Switch from "../components/Switch";


class DebugMenu extends PIXI.Graphics {
    active: boolean;
    constructor() {
        super();
        this.active = true;
        this.x = 10;
        this.y = 10;
        // this.interactive = true;
        this.eventMode = "static";

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
        this.lineStyle(2, 0x0, 1);
        this.drawRoundedRect(0, 0, 300, 500, 10);
        this.endFill();

        
        // Title
        const Title = new PIXI.Text('Debug Menu', {
            fontSize: 25,
            fontWeight: 'bold',
            fill: 0x000000,
            align: 'center',
        });
        Title.anchor.set(0.5);
        Title.x = 120;
        Title.y = 20;
        this.addChild(Title);


        // FPS
        const FPSlabel = new PIXI.Text('FPS: ' + Math.round(PIXI.Ticker.shared.FPS), {
            fontSize: 15,
            fontWeight: 'bold',
            fill: 0x000000,
            align: 'center',
        });
        FPSlabel.anchor.set(0.5);
        FPSlabel.x = 250;
        FPSlabel.y = 20;
        this.addChild(FPSlabel);

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

        // Hitboxes
        const HitBoxButton = new Switch(false, (status) => {
            
            // get all components
            this.parent.parent.getChildByName("movingCanvas").children?.map((child) => {
                if (child instanceof Component) {
                    if (status) {
                        child.showHitbox();
                    }
                    else {
                        child.removeHitbox();
                    }
                }
            });
        });
        HitBoxButton.x = 10;
        HitBoxButton.y = 100;
        this.addChild(HitBoxButton);

        const HitBoxLabel = new PIXI.Text('Show Hitboxes', {
            fontSize: 15,
            fontWeight: 'bold',
            fill: 0x000000,
            align: 'center',
        });
        HitBoxLabel.anchor.set(0.5);
        HitBoxLabel.x = this.width/2;
        HitBoxLabel.y = 100;
        this.addChild(HitBoxLabel);

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