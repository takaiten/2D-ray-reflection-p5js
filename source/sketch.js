const SWidth = window.innerWidth,
    SHeight = window.innerHeight;

let walls = [];
let ball;
let pause = false;
let play = false;

function setup() {
    createCanvas(SWidth, SHeight);

    ball = new Ball(SWidth / 2, SHeight / 2, 0, 10);

    walls.push(new Surface(-1, -1, SWidth + 1, -1));
    walls.push(new Surface(-1, -1, -1, SHeight + 1));
    walls.push(new Surface(-1, SHeight + 1, SWidth + 1, SHeight + 1));
    walls.push(new Surface(SWidth + 1, -1, SWidth + 1, SHeight + 1));

    colorMode(HSB);
}

function draw() {
    background(51, 10, 100);

    if (play) {
        ball.throwAt(walls);
    } else {
        stroke(0);
        let arrow = createVector(0, 0);
        arrow.x = mouseX - ball.origin.x;
        arrow.y = mouseY - ball.origin.y;
        arrow.setMag(SHeight/30);
        arrow.add(ball.origin);
        line(ball.origin.x, ball.origin.y, arrow.x, arrow.y);
    }
    ball.show();

    for (let wall of walls) {
        wall.show();
    }
}

function mousePressed() {
    if (!play) {
        play = true;
        ball.setAngle(mouseX, mouseY);
    } else {
        walls.push(new Surface(random(0, SWidth), random(0, SHeight), random(0, SWidth), random(0, SHeight)));
    }
    return false;
}

function keyPressed() {
    if (keyCode === 80) {
        pause = !pause;
        pause ? noLoop() : loop();
    }
    return false;
}
