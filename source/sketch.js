const SWidth = 800,
    SHeight = 600;

let beam;
let boundaries = [];

function setup() {
    createCanvas(SWidth, SHeight);
    beam = new Beam(createVector(SWidth/2, SHeight/2), 0.76, 7);
    boundaries.push(new Surface(3*SWidth/4, SHeight/4, 2*SWidth/4, 3*SHeight/4));
    boundaries.push(new Surface(SWidth/4, SHeight/4, 3*SWidth/4, SHeight/4));
    boundaries.push(new Surface(SWidth/4, SHeight/4, 2*SWidth/4, 3*SHeight/4));
    noLoop();
}

function draw() {
    background(0);
    // beam.lookAt(mouseX, mouseY);
    beam.intersect(boundaries);

    for (let bound of boundaries) {
        bound.show();
    }
    beam.show();
}