import './App.css';
import noise from './algorithm/script';
import {useEffect, useState} from "react";

function App() {

    const seedValue = parseInt(Math.random().toString().split('.')[1]);

    const [seed, setSeed] = useState(seedValue);

    useEffect(() => {
        let canvas = document.getElementsByTagName('canvas')[0];
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let ctx = canvas.getContext('2d');
        let image = ctx.createImageData(canvas.width, canvas.height);
        let data = image.data;

        let start = Date.now();

        noise.noise.seed(seed ? seed : Math.random());
        for (let x = 0; x < canvas.width; x++) {
            for (let y = 0; y < canvas.height; y++) {
                let value = Math.abs(noise.noise.perlin2(x / 100, y / 100));
                value *= 256;
                let cell = (x + y * canvas.width) * 4;
                data[cell] = data[cell + 1] = data[cell + 2] = value;
                data[cell] += Math.max(0, (25 - value) * 8);
                data[cell + 3] = 255; // alpha

            }
        }
        let end = Date.now();

        ctx.fillColor = 'black';
        ctx.fillRect(0, 0, 100, 100);
        ctx.putImageData(image, 0, 0);

        ctx.font = '16px sans-serif'
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.fillText('Rendered in ' + (end - start) + ' ms', canvas.width / 2, canvas.height - 100);

        if (console) {
            console.log('Rendered in ' + (end - start) + ' ms');
        }
    }, [seed]);


    return (
        <div className="centerbox">
            <span style={{marginLeft: '2rem'}}>Current Seed: <input type="number" onChange={(e) => setSeed(e.target.value)} value={seed}/></span>
            <canvas/>
        </div>
    );
}

export default App;
