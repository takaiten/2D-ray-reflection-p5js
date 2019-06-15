const SWidth = 800,
    SHeight = 600;

let beam;
let walls = [];
let ball;

function setup() {
    createCanvas(SWidth, SHeight);
    beam = new Beam(createVector(SWidth / 2, SHeight / 2), PI/3, 10);
    ball = new Trace(SWidth/2, SHeight/2, 25, 10);

    walls.push(new Surface(-1, -1, width + 1, -1));
    walls.push(new Surface(-1, -1, -1, height + 1));
    walls.push(new Surface(-1, height + 1, width + 1, height + 1));
    walls.push(new Surface(width + 1, -1, width + 1, height + 1));
}

function draw() {
    Keys();
    background(0);
    // ball.animate(SWidth/2, SHeight/2, mouseX, mouseY,);
    // ball.show();

    beam.lookAt(mouseX, mouseY);
    // beam.rotate(50);
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
    } else if (keyCode == 72) {
        walls.push(new Surface(random(0, SWidth), random(0, SHeight), random(0, SWidth), random(0, SHeight), random(0.6, 1)));
    }
}
