import './App.css';
import noise from './algorithm/script';
import {useEffect, useState} from "react";

function App() {

    const seedValue = parseInt(Math.random().toString().split('.')[1]);

    const [seed, setSeed] = useState(seedValue);

    const [redBgIntensity, setRedBgIntensity] = useState(1);
    const [greenBgIntensity, setGreenBgIntensity] = useState(1);
    const [blueBgIntensity, setBlueBgIntensity] = useState(1);

    const [redIntensity, setRedIntensity] = useState(1);
    const [greenIntensity, setGreenIntensity] = useState(1);
    const [blueIntensity, setBlueIntensity] = useState(1);

    function generateNoise() {
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
                // data[cell] = data[cell + 1] = data[cell + 2] = value;

                // Red
                data[cell] = value * redBgIntensity;
                data[cell] += Math.max(0, (25 - value) * redIntensity);

                // Green
                data[cell + 1] = value * greenBgIntensity;
                data[cell + 1] += Math.max(0, (25 - value) * blueIntensity);

                // Blue
                data[cell + 2] = value * blueBgIntensity;
                data[cell + 2] += Math.max(0, (25 - value) * blueIntensity);

                data[cell + 3] = 210; // alpha

            }
        }
        let end = Date.now();

        ctx.fillColor = 'black';
        ctx.fillRect(0, 0, 100, 100);
        ctx.putImageData(image, 0, 0);

        ctx.font = '16px'
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.fillText('Rendered in ' + (end - start) + ' ms', canvas.width / 2, canvas.height - 100);

        if (console) {
            console.log('Rendered in ' + (end - start) + ' ms');
        }
    }

    useEffect(() => {
        generateNoise();
    }, [seed, redIntensity, greenIntensity, blueIntensity, redBgIntensity, greenBgIntensity, blueBgIntensity]);


    return (
        <div className="centerbox">
            <span style={{marginLeft: '2rem'}}>Current Seed: <input type="number"
                                                                    onChange={(e) => setSeed(e.target.value)}
                                                                    value={seed}/></span> <br/>
            <span style={{marginLeft: '2rem'}}>Current Red Intensity: <input type="number"
                                                                             style={{width: "50px"}}
                                                                             onChange={(e) => setRedIntensity(e.target.value)}
                                                                             value={redIntensity}/></span>
            <span style={{marginLeft: '2rem'}}>Current Green Intensity: <input type="number"
                                                                               style={{width: "50px"}}
                                                                               onChange={(e) => setGreenIntensity(e.target.value)}
                                                                               value={greenIntensity}/></span>
            <span style={{marginLeft: '2rem'}}>Current Blue Intensity: <input type="number"
                                                                              style={{width: "50px"}}
                                                                              onChange={(e) => setBlueIntensity(e.target.value)}
                                                                              value={blueIntensity}/></span> <br/>
            <span style={{marginLeft: '2rem'}}>Current Red Background Intensity: <input type="number"
                                                                                        style={{width: "50px"}}
                                                                                        onChange={(e) => setRedBgIntensity(e.target.value)}
                                                                                        value={redBgIntensity}/></span>
            <span style={{marginLeft: '2rem'}}>Current Green Background Intensity: <input type="number"
                                                                                          style={{width: "50px"}}
                                                                                          onChange={(e) => setGreenBgIntensity(e.target.value)}
                                                                                          value={greenBgIntensity}/></span>
            <span style={{marginLeft: '2rem'}}>Current Blue Background Intensity: <input type="number"
                                                                                         style={{width: "50px"}}
                                                                                         onChange={(e) => setBlueBgIntensity(e.target.value)}
                                                                                         value={blueBgIntensity}/></span>


            <canvas/>
        </div>
    );
}

export default App;
