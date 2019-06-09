const SWidth = 800,
    SHeight = 600;

let beam;
let walls = [];

function setup() {
    createCanvas(SWidth, SHeight);
    beam = new Beam(createVector(SWidth / 2, SHeight / 2), 0, 10);

    walls.push(new Boundary(-1, -1, width + 1, -1));
    walls.push(new Boundary(-1, -1, -1, height + 1));
    walls.push(new Boundary(-1, height + 1, width + 1, height + 1));
    walls.push(new Boundary(width + 1, -1, width + 1, height + 1));
}

function draw() {
    Keys();
    background(0);

    beam.lookAt(mouseX, mouseY);
    beam.reflectFrom(walls);

    for (let wall of walls) {
        wall.show();
    }
}

let sw = true;
function mousePressed() {
    sw ? noLoop() : loop();
    sw = !sw;
    return false;
}

let step = 2;
function Keys() {
    if (keyIsPressed) {
        if (key == 'w') {
            beam.moveBy(0, -step);
        } else if (key == 'a') {
            beam.moveBy(-step, 0);
        } else if (key == 's') {
            beam.moveBy(0, step);
        } else if (key == 'd') {
            beam.moveBy(step, 0);
        }
    }
}

function keyPressed() {
    if (keyCode == 71) {
        walls.push(new Surface(random(0, SWidth), random(0, SHeight), random(0, SWidth), random(0, SHeight)));
    }
}