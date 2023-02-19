import React, { useEffect, useState, useRef } from "react";

import * as PIXI from "pixi.js";
import { Viewport } from 'pixi-viewport'

import Background from "./simulator/core/Background";
import DebugMenu from "./simulator/ui/menus/DebugMenu";

import Component from "./simulator/components/Component";
import Led from "./simulator/components/electronics/Led";

function App() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [app, setApp] = useState<PIXI.Application>();

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
            app.stage.interactive = true;

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

            // add the viewport to the stage
            movingCanvas.addChild(movingCanvas)

            // activate plugins
            movingCanvas
            .drag()
            .pinch()
            .wheel()
            .decelerate()
            

            const background = new Background(10000);
            movingCanvas.addChild(background);


			const leds: Led[] = [];
			for (let i = 0; i < 10; i++) {
				const led = new Led();
				led.x = Math.random() * 500
				led.y = Math.random() * 500
				// random between 0 and 1
				led.status = Math.random() > 0.5 ? true : false;
				leds.push(led);
				movingCanvas.addChild(led);
			}

			app.stage.addChild(movingCanvas);





			// Everything that doesn't move with the camera should be in this container (UI)
			const fixedCanvas = new PIXI.Container();

			const debugMenu = new DebugMenu();
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
