import React, { useEffect, useState, useRef} from "react";
import * as PIXI from "pixi.js";

function App() {
	const canvasRef = useRef<HTMLDivElement | null>(null);
    const [app, setApp] = useState<PIXI.Application>();
	
	useEffect(() => {
		const width = window.innerWidth;
		const height = window.innerHeight;
		const app = new PIXI.Application({
			width: width,
			height: height,
			backgroundColor: 0xa0a0a0,
			antialias: true,
		});
		setApp(app);
	}, []);

	useEffect(() => {
		if (canvasRef.current && app && app.view instanceof HTMLCanvasElement) {
			//remove all childs 
			while (canvasRef.current.firstChild) {
				canvasRef.current.removeChild(canvasRef.current.firstChild);
			}
			canvasRef.current.appendChild(app.view);
		}

	}, [app]);




    return (
        <div className="App" ref={canvasRef}>
        </div>
    );
}

export default App;
