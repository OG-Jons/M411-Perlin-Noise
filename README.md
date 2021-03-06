# Perlin Noise Image Generator

![Image of the generation](https://github.com/OG-Jons/M411-Perlin-Noise-Game/blob/master/public/perlinImage.png?raw=true)

## What does it do?
This tool will generate an image, using a Perlin Noise algorithm, with a given seed. You can customize this seed to your liking. <br>
By default, it will generate a black and white image, but using the input fields you can customize this. <br>
Keep in mind, the time taken to generate this, depends on your hardware and resolution.

## Data measurements
We made tests and measured on different resolutions, how long it would take to generate an image. <br>
We tested every resolution 3 times and averaged the results.
This graph shows the summary of this test. <br>
![Image of graph](https://github.com/OG-Jons/M411-Perlin-Noise-Game/blob/master/public/data.png?raw=true) <br>
As you can clearly see, the time it takes to render, increases linearly with the resolution. <br>


## Develop locally

### Check if Node.js is installed
Run the following command in your terminal:
```
node -v
```
If you see a version number, Node.js is installed. It's better to have it on the LTS version.


### Install dependencies
Run the following command in the directory where the project is located:
```
npm install
```


### Start the App
Run the following command in your terminal:
```
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
