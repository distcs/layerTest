let basicShader;
let shaderTexture;
let randT, colorFreq, rseed;
let dir = 1;
let targetDir = 1;
let transitionStartTime = 0;
let transitionDuration = 10000;

let mousePressedTime = 0;
let mousePressPosition = [0, 0];
let mousePressedFlag = false;
let numColors = 2;
const maxColors = 4;

const maxShaderDrops = 50;
let colorDrops = [];
let paletteColors = [];

let tex, cols, grid, clearVal;
let chro;
let orr;
let speed = 0.5;
let aniBri = 0.001;

let isPlaying = false;

const colorPalettes = [
    [ //////0
        [0.129, 0.145, 0.171],
        [0.204, 0.227, 0.251],
        [0.424, 0.459, 0.490],
        [0.678, 0.710, 0.741]
    ],
    [ //////1
        [0.039, 0.035, 0.031],
        [0.133, 0.200, 0.231],
        [0.776, 0.675, 0.561],
        [0.918, 0.878, 0.835]
    ],
    [ /////2
        [0.078, 0.212, 0.259],
        [0.059, 0.545, 0.553],
        [0.925, 0.604, 0.161],
        [0.855, 0.824, 0.847]
    ],
    [ ////3
        [0.090, 0.102, 0.129],
        [0.380, 0.439, 0.451],
        [0.478, 0.576, 0.675],
        [0.573, 0.737, 0.918]
    ],
    [ ////////4
        [0.027, 0.310, 0.341],
        [0.027, 0.443, 0.529],
        [0.455, 0.647, 0.498],
        [0.620, 0.808, 0.604]
    ],
    [ /////5
        [0.074, 0.235, 0.333],
        [0.220, 0.435, 0.643],
        [0.349, 0.647, 0.847],
        [0.518, 0.824, 0.961]
    ],
    [ ////////6
        [0.271, 0.216, 0.314],
        [0.451, 0.392, 0.541],
        [0.596, 0.510, 0.675],
        [0.639, 0.576, 0.749]
    ],
    [ //////////7
        [0.133, 0.341, 0.478],
        [0.220, 0.639, 0.647],
        [0.341, 0.800, 0.600],
        [0.502, 0.929, 0.600]
    ],
    [ //////8
        [0.192, 0.180, 0.165], // Warm taupe
        [0.341, 0.325, 0.310], // Muted gray
        [0.510, 0.490, 0.459], // Soft beige
        [0.749, 0.729, 0.698] // Light sand
    ],
    [ //////9
        [0.098, 0.129, 0.141], // Deep slate
        [0.220, 0.259, 0.278], // Charcoal
        [0.400, 0.439, 0.459], // Stormy gray
        [0.600, 0.639, 0.659] // Misty blue
    ],
    [ //////10
        [0.871, 0.800, 0.600], // Gold
        [0.929, 0.878, 0.800], // Light gold
        [0.769, 0.749, 0.729], // Silver
        [0.949, 0.929, 0.910] // Pearl
    ],
    [ //////11
        [0.141, 0.110, 0.098], // Dark espresso
        [0.310, 0.278, 0.251], // Mocha
        [0.549, 0.510, 0.478], // Latte
        [0.749, 0.710, 0.678] // Cream
    ],
    [ //////12
        [0.200, 0.220, 0.180], // Forest green
        [0.310, 0.341, 0.290], // Sage
        [0.459, 0.490, 0.439], // Olive
        [0.600, 0.639, 0.588] // Pale green
    ],
    [ //////13
        [0.129, 0.098, 0.078], // Dark chocolate
        [0.251, 0.180, 0.141], // Rust
        [0.459, 0.349, 0.290], // Terracotta
        [0.678, 0.549, 0.478] // Clay
    ],
    [ //////14
        [0.098, 0.129, 0.180], // Navy
        [0.200, 0.259, 0.341], // Denim
        [0.349, 0.439, 0.549], // Sky blue
        [0.510, 0.600, 0.710] // Pale blue
    ],
    [ //////15
        [0.180, 0.141, 0.129], // Burgundy
        [0.310, 0.220, 0.200], // Maroon
        [0.459, 0.349, 0.329], // Dusty rose
        [0.600, 0.510, 0.490] // Blush
    ],
    [ //////16
        [0.110, 0.098, 0.078], // Blackened brown
        [0.220, 0.200, 0.180], // Warm gray
        [0.400, 0.380, 0.349], // Stone
        [0.600, 0.580, 0.549] // Light stone
    ],
    [ //////17
        [0.129, 0.180, 0.141], // Deep emerald
        [0.220, 0.310, 0.251], // Pine
        [0.349, 0.459, 0.400], // Mint
        [0.510, 0.600, 0.549] // Seafoam
    ],
    [ //////18
        [0.200, 0.200, 0.200], // Charcoal
        [0.400, 0.400, 0.400], // Stormy gray
        [0.800, 0.800, 0.800], // Silver mist
        [0.949, 0.949, 0.949] // Pearl white
    ],
    [ //////19
        [0.129, 0.098, 0.078], // Dark chocolate
        [0.349, 0.278, 0.220], // Mocha
        [0.600, 0.510, 0.439], // Latte
        [0.800, 0.729, 0.678] // Cream
    ],
    [ //////20
        [0.098, 0.129, 0.180], // Midnight blue
        [0.200, 0.259, 0.341], // Deep denim
        [0.400, 0.459, 0.549], // Soft slate
        [0.600, 0.659, 0.749] // Pale sky
    ],
    [ //////21
        [0.180, 0.141, 0.129], // Burgundy
        [0.310, 0.220, 0.200], // Maroon
        [0.459, 0.349, 0.329], // Dusty rose
        [0.600, 0.510, 0.490] // Blush
    ],
    [ //////22
        [0.110, 0.098, 0.078], // Blackened brown
        [0.220, 0.200, 0.180], // Warm gray
        [0.400, 0.380, 0.349], // Stone
        [0.600, 0.580, 0.549] // Light stone
    ],
    [ //////23
        [0.129, 0.180, 0.141], // Deep emerald
        [0.220, 0.310, 0.251], // Pine
        [0.349, 0.459, 0.400], // Mint
        [0.510, 0.600, 0.549] // Seafoam
    ],
    [ //////24
        [0.871, 0.800, 0.600], // Gold
        [0.929, 0.878, 0.800], // Light gold
        [0.769, 0.749, 0.729], // Silver
        [0.949, 0.929, 0.910] // Pearl
    ],
    [ //////25
        [0.098, 0.129, 0.141], // Deep slate
        [0.220, 0.259, 0.278], // Charcoal
        [0.400, 0.439, 0.459], // Stormy gray
        [0.600, 0.639, 0.659] // Misty blue
    ],
    [ //////26
        [0.192, 0.180, 0.165], // Warm taupe
        [0.341, 0.325, 0.310], // Muted gray
        [0.510, 0.490, 0.459], // Soft beige
        [0.749, 0.729, 0.698] // Light sand
    ],
    [ //////27
        [0.090, 0.102, 0.129], // Deep ocean
        [0.200, 0.220, 0.259], // Stormy sea
        [0.400, 0.439, 0.478], // Misty blue
        [0.600, 0.659, 0.698] // Pale aqua
    ],
    [ //////28
        [0.129, 0.098, 0.078], // Dark chocolate
        [0.349, 0.278, 0.220], // Mocha
        [0.600, 0.510, 0.439], // Latte
        [0.800, 0.729, 0.678] // Cream
    ],
    [ //////29
        [0.098, 0.129, 0.180], // Midnight blue
        [0.200, 0.259, 0.341], // Deep denim
        [0.400, 0.459, 0.549], // Soft slate
        [0.600, 0.659, 0.749] // Pale sky
    ],
    [ //////30
        [0.180, 0.141, 0.129], // Burgundy
        [0.310, 0.220, 0.200], // Maroon
        [0.459, 0.349, 0.329], // Dusty rose
        [0.600, 0.510, 0.490] // Blush
    ],
    [ //////31
        [0.110, 0.098, 0.078], // Blackened brown
        [0.220, 0.200, 0.180], // Warm gray
        [0.400, 0.380, 0.349], // Stone
        [0.600, 0.580, 0.549] // Light stone
    ],
    [ //////32
        [0.129, 0.180, 0.141], // Deep emerald
        [0.220, 0.310, 0.251], // Pine
        [0.349, 0.459, 0.400], // Mint
        [0.510, 0.600, 0.549] // Seafoam
    ],
    [ //////33
        [0.871, 0.800, 0.600], // Gold
        [0.929, 0.878, 0.800], // Light gold
        [0.769, 0.749, 0.729], // Silver
        [0.949, 0.929, 0.910] // Pearl
    ],
    [ //////34
        [0.098, 0.129, 0.141], // Deep slate
        [0.220, 0.259, 0.278], // Charcoal
        [0.400, 0.439, 0.459], // Stormy gray
        [0.600, 0.639, 0.659] // Misty blue
    ],
    [ //////35
        [0.192, 0.180, 0.165], // Warm taupe
        [0.341, 0.325, 0.310], // Muted gray
        [0.510, 0.490, 0.459], // Soft beige
        [0.749, 0.729, 0.698] // Light sand
    ],
    [ //////36
        [0.090, 0.102, 0.129], // Deep ocean
        [0.200, 0.220, 0.259], // Stormy sea
        [0.400, 0.439, 0.478], // Misty blue
        [0.600, 0.659, 0.698] // Pale aqua
    ],
    [ //////37
        [0.180, 0.055, 0.008], // #2E0E02
        [0.345, 0.098, 0.031], // #581908
        [0.596, 0.212, 0.157], // #983628
        [0.886, 0.682, 0.867] // #E2AEDD
    ],
    [ //////38
        [0.886, 0.682, 0.867], // #E2AEDD
        [0.859, 0.745, 0.631], // #DBBEA1
        [0.639, 0.482, 0.451], // #A37B73
        [0.247, 0.161, 0.169] // #3F292B
    ],
    [ //////39
        [0.831, 0.686, 0.216], // #D4AF37
        [0.722, 0.525, 0.043], // #B8860B
        [0.961, 0.961, 0.863], // #F5F5DC
        [0.545, 0.000, 0.000] // #8B0000
    ]


];

let selectedPaletteIndex;
let currentHashSeed;
let seeed;

function preload() {
    basicShader = loadShader('shader.vert', 'shader.frag');
}

function hashStringToNumber(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}

function generateRandomHash(length = 12) {
    const chars = 'abcdef0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function setup() {
    pixelDensity(1);
    let w = window.innerWidth;
    let h = window.innerHeight;

    let canvas = createCanvas(w, h, WEBGL);
    noStroke();

    shaderTexture = createGraphics(w, h, WEBGL);
    shaderTexture.noStroke();
    shaderTexture.pixelDensity(1);

    currentHashSeed = generateRandomHash();

    selectedPaletteIndex = floor(random(colorPalettes.length));

    clearVal = random([1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 9.0, 10.0]);
    colorFreq = random(1, 6);

    speed = random(0.2, 1.0);
    orr = random([0.0, 0.5, 1.0, 1.5, 0.0]);

    // selectedPaletteIndex = 0 /// 10 12 13 15 18 19 20 21 24 37 

    if (typeof $layer !== 'undefined') {
        $layer.registerCanvas(canvas.elt)
            .params({
                customization_level: 'VIEWER',
                kind: 'HASH',
                id: 'seed',
                name: 'Seed Hash',
                default: currentHashSeed,
                minLength: 6,
                maxLength: 64
            }, {
                customization_level: 'VIEWER',
                kind: 'NUMBER',
                id: 'colorF',
                name: 'Color Frequency',
                default: colorFreq,
                min: 1,
                max: 6,
                step: 0.001,
            }, {
                customization_level: 'VIEWER',
                kind: 'NUMBER',
                id: 'colorP',
                name: 'Color Palette',
                default: selectedPaletteIndex,
                min: 0,
                max: colorPalettes.length - 1,
                step: 1
            }, {
                customization_level: 'VIEWER',
                kind: 'NUMBER',
                id: 'detail',
                name: 'Detail',
                default: clearVal,
                min: 1,
                max: 10,
                step: 1,
            }, {
                customization_level: 'VIEWER',
                kind: 'NUMBER',
                id: 'speed',
                name: 'speed',
                default: speed,
                min: 0.2,
                max: 1.0,
                step: 0.05
            }, {
                customization_level: 'VIEWER',
                kind: 'LIST',
                id: 'orientation',
                name: 'orientation',
                // Ensure we produce a valid string from orr, e.g. "1.0" or "0.5"
                default: orr.toFixed(1),
                options: [{
                        value: '0.0',
                        label: 'left'
                    },
                    {
                        value: '1.0',
                        label: 'right'
                    },
                    {
                        value: '0.5',
                        label: 'down'
                    },
                    {
                        value: '1.5',
                        label: 'up'
                    }
                ]
            })
            .then(({
                seed,
                colorP: cp,
                colorF: cf,
                detail: dt,
                speed: sp,
                orientation: oriVal
            }) => {
                currentHashSeed = seed;
                let numericSeed = hashStringToNumber(seed);
                randomizeVariables(numericSeed);

                selectedPaletteIndex = cp;
                colorFreq = cf;
                clearVal = dt;
                speed = sp;
                orr = parseFloat(oriVal);

                if (!$layer.controlled) {
                    isPlaying = true;
                    loop();
                } else {
                    isPlaying = false;
                    noLoop();
                }
            });

        globalThis.addEventListener('layer:paramchange', (event) => {
            const {
                id,
                value
            } = event.detail;
            if (id === 'colorF') {
                colorFreq = value;
            } else if (id === 'colorP') {
                selectedPaletteIndex = value;
            } else if (id === 'detail') {
                clearVal = value;
            } else if (id === 'seed') {
                currentHashSeed = value;
                let numericSeed = hashStringToNumber(value);
                randomizeVariables(numericSeed);
            } else if (id === 'speed') {
                speed = value;
            } else if (id === 'orientation') {
                orr = parseFloat(value);
            }
        });

        globalThis.addEventListener('layer:play', () => {
            isPlaying = true;
            loop();
        });

        globalThis.addEventListener('layer:pause', () => {
            isPlaying = false;
            noLoop();
        });

        globalThis.addEventListener('layer:reset', () => {
            let numericSeed = hashStringToNumber(currentHashSeed);
            randomizeVariables(numericSeed);
            if (!$layer.controlled) {
                isPlaying = true;
                loop();
            } else {
                isPlaying = false;
                noLoop();
            }
        });
    } else {
        let numericSeed = hashStringToNumber(currentHashSeed);
        randomizeVariables(numericSeed);
        isPlaying = true;
        loop();
    }
}

function randomizeVariables(numericSeed) {
    randomSeed(numericSeed);
    noiseSeed(numericSeed);

    randT = random(1);
    rseed = random(1);
    if (colorFreq === undefined) colorFreq = random(1, 6);
    if (selectedPaletteIndex === undefined) selectedPaletteIndex = floor(random(colorPalettes.length));
    tex = random([1.0, 2.0, 2.0]);
    if (selectedPaletteIndex == 6 || selectedPaletteIndex == 7) {
        tex = 2.0;
    }
    cols = random([0.0, 1.0, 2.0, 3.0, 4.0, 5.0]);
    grid = random([1.0, 1.0, 1.0, 2.0, 2.0]);
    if (clearVal === undefined) {
        clearVal = random([1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 9.0, 10.0]);
    }
    chro = random([0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]);
    dir = random([-1, 1]);

    if (orr === undefined) orr = random([0.0, 0.5, 1.0, 1.5, 0.0]); // No changes here
    if (speed === undefined) speed = random(0.2, 1.0);
}

function draw() {
    basicShader.setUniform('u_cols', cols);
    basicShader.setUniform('u_pixelDensity', pixelDensity());
    basicShader.setUniform('img', shaderTexture);
    basicShader.setUniform('u_resolution', [width, height]);
    basicShader.setUniform('u_time', millis() / 1000.0);
    basicShader.setUniform('u_speed', speed);
    basicShader.setUniform('u_windSpeed', 1.0);
    basicShader.setUniform('u_mouse', [mouseX, height - mouseY]);
    basicShader.setUniform('u_middle', [width, height]);
    basicShader.setUniform('u_t', randT);
    basicShader.setUniform('u_colorFreq', colorFreq);
    basicShader.setUniform('u_randomSeed', rseed);
    basicShader.setUniform('u_dir', dir);
    basicShader.setUniform('u_tex', tex);
    basicShader.setUniform('u_grid', grid);
    basicShader.setUniform('u_clear', clearVal);
    basicShader.setUniform('u_mousePressTime', mousePressedTime);
    basicShader.setUniform('u_mousePressPosition', mousePressPosition);
    basicShader.setUniform('u_mousePressed', mousePressedFlag ? 1.0 : 0.0);
    basicShader.setUniform('u_numColors', numColors);
    basicShader.setUniform('u_chro', chro);
    basicShader.setUniform('u_bri', aniBri);

    let selectedPalette = colorPalettes[selectedPaletteIndex];

    basicShader.setUniform('u_col1', selectedPalette[0]);
    basicShader.setUniform('u_col2', selectedPalette[1]);
    basicShader.setUniform('u_col3', selectedPalette[2]);
    basicShader.setUniform('u_col4', selectedPalette[3]);

    shaderTexture.shader(basicShader);
    shaderTexture.rect(0, 0, width, height);

    rotate((PI * orr));
    translate(-width / 2, -height / 2);
    image(shaderTexture, 0, 0);
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight, WEBGL);
    shaderTexture.resizeCanvas(window.innerWidth, window.innerHeight, WEBGL);
}