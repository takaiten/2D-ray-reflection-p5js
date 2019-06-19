const SWidth = 800,
    SHeight = 600;

let beam;
let walls = [];
let ball;
let ring;



function setup() {
    createCanvas(SWidth, SHeight);
    beam = new Beam(createVector(SWidth / 2, SHeight / 2), 0, 10);
    ball = new Ball(SWidth/2, SHeight/2, 0, 10);

	//ring = new Circle(SWidth/2, SHeight/2, SHeight/3, 1000);
	
    walls.push(new Surface(-1, -1, width + 1, -1));
    walls.push(new Surface(-1, -1, -1, height + 1));
    walls.push(new Surface(-1, height + 1, width + 1, height + 1));
    walls.push(new Surface(width + 1, -1, width + 1, height + 1));
	
	colorMode(HSB);
}

let SWITCH = true;
function draw() {
    Keys();
    background(92);
	
    ball.show();
	if(!SWITCH) {
		ball.throwAt(walls);
	}
	
    //beam.lookAt(mouseX, mouseY);
    //beam.rotate(50);
    //beam.reflectFrom(walls);
    //beam.reflectFrom([...walls, ...ring.getSurfaceArray()]);
	
    for (let wall of walls) {
        wall.show();
    }
	//ring.show();
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
        } else if (key == 'k') {
			if (SWITCH) {
				SWITCH = false;
				ball.setAngle(mouseX, mouseY);
			}
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
