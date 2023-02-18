import React, { useEffect, useState, useRef } from "react";
import * as PIXI from "pixi.js";
import Background from "./simulator/core/Background";
import Camera from "./simulator/core/Camera";
import DebugMenu from "./simulator/ui/DebugMenu";

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
                // antialias: true,
                view: canvasRef.current,
            });


			// Everything that moves with the camera should be in this container
			const movingCanvas = new PIXI.Container();

            const background = new Background(10000);
            movingCanvas.addChild(background);

			const camera = new Camera(movingCanvas);
			movingCanvas.addChild(camera);

			app.stage.addChild(movingCanvas);

			// Everything that doesn't move with the camera should be in this container (UI)
			const fixedCanvas = new PIXI.Container();

			const debugMenu = new DebugMenu();
			fixedCanvas.addChild(debugMenu);
			// testing purposes
			// const player = PIXI.Sprite.from("https://pixijs.io/examples/examples/assets/bunny.png");
            // player.anchor.set(0.5);
            // player.x = app.screen.width / 2;
            // player.y = app.screen.height / 2;
			// fixedCanvas.addChild(player);

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
