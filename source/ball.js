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

    for (let i = 0; i <= len; i++) {
        let temp = dir.copy();
        temp.setMag(i * padding);
        let point = p5.Vector.add(A, temp);

        ellipse(point.x, point.y, radius);
    }
};

class Ball {
    constructor(X, Y, angle, speed = 10) {
        this.origin = createVector(X, Y);
        this.trace = new Trace(this.origin, SHeight / 40, 5);
        this.beam = new Beam(this.origin, angle);
        this.speed = speed;
    }

    show() {
        fill(frameCount % 255, 255, 255);
        this.trace.show();
    }

    set(X, Y) {
        this.origin.set(X, Y);
    }

    setAngle(X, Y) {
        this.beam.lookAt(X, Y);
    }

    throwAt(walls) {
        this.beam.reflectFrom(walls);
        if (this.beam.reflection) {
            const bool = this.trace.animateTo(this.beam.reflection.ray.origin, this.speed, this.speed);
            if (bool) {
                //this.speed /= 1.1;
                this.origin = this.beam.reflection.ray.origin;
                this.beam.ray.dir = this.beam.reflection.ray.dir;
                delete this.beam.reflection;
            }
        }
    }
}

class Trace {
    constructor(origin, radius, N = 5) {
        this.origin = origin;
        this.dir = createVector(0, 0);
        this.mag = 0;

        // ball parameters
        this.r = radius;
        this.n = N;
        this.begin = false;
    }

    show() {
        noStroke();
        ellipse(this.origin.x, this.origin.y, this.r);
        for (let i = 1; i < this.n + 1; i++) {
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

    animateTo(point, eps, speed = 10) {
        if (this.begin) {
            let newOrigin = p5.Vector.add(this.origin, this.pointing);
            this.dir = p5.Vector.sub(newOrigin, this.origin);
            this.dir.normalize();
            this.origin.set(newOrigin);

            if (p5.Vector.dist(this.origin, point) < eps + 1) {
                this.begin = false;
                return true;
            }
            return false;
        } else {
            this.begin = true;
            this.pointing = p5.Vector.sub(point, this.origin);
            this.pointing.setMag(speed);
            this.mag = speed;
            return false;
        }
    }

    animate(x1, y1, x2, y2, eps, speed = 10) {
        if (this.a) {
            this.a.add(this.pointing);
            this.moveTo(this.a.x, this.a.y);
            if (abs(this.a.x - this.b.x) < eps && abs(this.a.y - this.b.y) < eps + 1) {
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
}
