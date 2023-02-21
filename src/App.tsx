import React, { useEffect, useState, useRef } from "react";

import * as PIXI from "pixi.js";
import { Viewport } from 'pixi-viewport'

import Background from "./simulator/core/Background";
import DebugMenu from "./simulator/ui/menus/DebugMenu";

import Component from "./simulator/components/Component";
import Led from "./simulator/components/electronics/Led";
import Battery from "./simulator/components/electronics/Battery";
import Switch from "./simulator/components/electronics/Switch";

function App() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [app, setApp] = useState<PIXI.Application>();
    const [currentlyEditing, setCurrentlyEditing] = useState<Component | null>(null);

    useEffect(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        if (canvasRef.current) {
            const app = new PIXI.Application({
                width: width,
                height: height,
                backgroundColor: 0x505050,
                antialias: true,
                view: canvasRef.current,
            });
            // app.stage.interactive = true;

			// app.stage.eventMode = "static";

            // create viewport
            const movingCanvas = new Viewport({
                screenWidth: window.innerWidth,
                screenHeight: window.innerHeight,
                worldWidth: 1000,
                worldHeight: 1000,

                events: app.renderer.events,
            })
			movingCanvas.name = "movingCanvas";
            movingCanvas.interactive = true;

            const background = new Background(10000);


            // Everything that doesn't move with the camera should be in this container (UI)
			const fixedCanvas = new PIXI.Container();

			const debugMenu = new DebugMenu();

            // add the viewport to the stage
            // movingCanvas.addChild(movingCanvas)

            // activate plugins
            movingCanvas
            .drag()
            .pinch()
            .wheel()
            .decelerate({
                friction: 0.85,
            })

            // when starting to drag, ignore all other interactions
            movingCanvas.on("drag-start", (e) => {
                movingCanvas.children.forEach((child) => {
                    if (child instanceof Component) {
                        child.interactive = false;
                    }
                });

                debugMenu.interactive = false;
            });     
            
            // when done dragging, re-enable all interactions
            movingCanvas.on("drag-end", (e) => {

                movingCanvas.children.forEach((child) => {
                    if (child instanceof Component) {
                        child.interactive = true;

                        // debug
                        if (child instanceof Led) {
                            // child.pinMinus
                        }
                    }
                });

                debugMenu.interactive = true;
            });

            

            
            movingCanvas.addChild(background);

            




			const leds: Led[] = [];
			for (let i = 0; i < 10; i++) {
				const led = new Led();
				led.x = i * 200 + 700;
                led.y = 150;

				// led.y = i * 50
				// random between 0 and 1
				led.status = Math.random() > 0.5 ? true : false;
				leds.push(led);
				movingCanvas.addChild(led);
			}


            const swtch = new Switch();
            swtch.x = 500;
            swtch.y = 500;
            movingCanvas.addChild(swtch);

            const battery = new Battery();
            battery.x = 500;
            battery.y = 300;
            movingCanvas.addChild(battery);




			app.stage.addChild(movingCanvas);

			fixedCanvas.addChild(debugMenu);
			app.stage.addChild(fixedCanvas);


            

            setApp(app);
            // app.stage.x = 500;			
        }
    }, []);

    return (
        <div className="App">
            <canvas id="game" ref={canvasRef}></canvas>
        </div>
    );
}

export default App;
