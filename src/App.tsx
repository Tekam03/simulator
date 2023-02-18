import React, { useEffect, useState, useRef} from "react";
import * as PIXI from "pixi.js";
import Background from "./simulator/core/Background";

function App() {
	const canvasRef = useRef<HTMLDivElement | null>(null);
    const [app, setApp] = useState<PIXI.Application>();
	const [player, setPlayer] = useState<PIXI.Sprite>();
	
	useEffect(() => {
		const width = window.innerWidth;
		const height = window.innerHeight;
		const app = new PIXI.Application({
			width: width,
			height: height,
			backgroundColor: 0x505050,
			antialias: true,
		});
		app.stage.interactive = true;

		setApp(app);

		const background = new Background(app.screen.width, app.screen.height);
		console.log(app.screen.width)
		app.stage.addChild(background);


		const player = PIXI.Sprite.from("https://pixijs.io/examples/examples/assets/bunny.png");
		player.anchor.set(0.5);
		player.x = app.screen.width / 2;
		player.y = app.screen.height / 2;
		setPlayer(player);

		
		
	}, []);

	useEffect(() => {
		if (canvasRef.current && app && app.view instanceof HTMLCanvasElement) {
			//remove all childs 
			while (canvasRef.current.firstChild) {
				canvasRef.current.removeChild(canvasRef.current.firstChild);
			}
			canvasRef.current.appendChild(app.view);

			// app.stage.on("pointermove", (event) => {
			// 	console.log(event.global.x)
			// });

			
		}


	}, [app]);

	useEffect(() => {

		if (app && player) {


			// app.stage.on("pointermove", (event) => {
			// 	console.log(event.global.x)
			// 	player.x = event.global.x;
			// 	player.y = event.global.y;
			// });

			app.stage.addChild(player);

		}

	}, [app, player]);
	
	


    return (
        <div className="App" ref={canvasRef}>
        </div>
    );
}

export default App;
