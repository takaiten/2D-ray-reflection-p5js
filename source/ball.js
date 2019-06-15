// function dottedLine(x1, y1, x2, y2, color = 255, radius = height / 300, padding = 5) {
//     // const coords = (lambda) => {
//     //     return createVector(
//     //         (x2 + lambda * x1) / (1 + lambda),
//     //         (y2 + lambda * y1) / (1 + lambda)
//     //     );
//     // };
//     // const coords2 = (lambda) => {
//     //     return createVector(
//     //         lambda * x1 + (1 - lambda) * x2,
//     //         lambda * y1 + (1 - lambda) * y2
//     //     );
//     // };
//     const A = createVector(x1, y1);
//     const B = createVector(x2, y2);
//     const dir = p5.Vector.sub(B, A);
//     const len = dir.mag() / padding;
//
//     push();
//     noStroke();
//     fill(color);
//     for (let i = 0; i <= len; i++) {
//         let temp = dir.copy();
//         temp.setMag(i * padding);
//         let point = p5.Vector.add(A, temp);
//
//         ellipse(point.x, point.y, radius);
//     }
//     pop();
// }

const dottedLine = (A, B, color = 255, radius = height / 300, padding = 5) => {
    const dir = p5.Vector.sub(B, A);
    const len = dir.mag() / padding;

    push();
    noStroke();
    fill(color);
    for (let i = 0; i <= len; i++) {
        let temp = dir.copy();
        temp.setMag(i * padding);
        let point = p5.Vector.add(A, temp);

        ellipse(point.x, point.y, radius);
    }
    pop();
};

class Trace {
    constructor(x, y, radius, N = 5) {
        this.origin = createVector(x, y);
        this.dir = createVector(0, 0);
        this.mag = 0;

        // ball parameters
        this.r = radius;
        this.n = N;
        // this.amount = 0; // for lerp method
    }

    show() {
        noStroke();
        fill(255);
        ellipse(this.origin.x, this.origin.y, this.r);
        for (let i = 1; i < this.n + 1; i++) {
            fill(255, 255 / (i / 2));
            ellipse(this.origin.x - this.dir.x * (this.mag * i), this.origin.y - this.dir.y * (this.mag * i), this.r * (this.n - (i)) / this.n);
        }
    }

    moveTo(X, Y) {
        this.dir.x = X - this.origin.x;
        this.dir.y = Y - this.origin.y;
        this.mag = this.dir.mag();
        this.dir.normalize();

        this.origin.set(X, Y);
    }

    animate(x1, y1, x2, y2, speed = 10) {
        if (this.a) {
            this.a.add(this.pointing);
            this.moveTo(this.a.x, this.a.y);
            if (abs(this.a.x - this.b.x) < 5 && abs(this.a.y - this.b.y) < 5) {
                print('reached');
                delete this.a;
                return true;
            }
            return false;
        } else {
            this.a = createVector(x1, y1);
            this.b = createVector(x2, y2);
            this.pointing = p5.Vector.sub(this.b, this.a);
            this.pointing.setMag(speed);
            return false;
        }
    }

    // lerp(a, b, speed = 0.01) {
    //     this.amount += speed;
    //     let to = p5.Vector.lerp(a, b, this.amount);
    //     this.moveTo(to.x, to.y);
    //     if (abs(to.x - b.x) < 1e-10 && abs(to.y - b.y) < 1e-10) {
    //         print("reset");
    //         this.amount = 0;
    //         return true;
    //     }
    //     return false;
    // }
}
