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

class Ball {
	constructor(X, Y, angle, speed = 10) {
		this.origin = createVector(X, Y);
		this.trace = new Trace(this.origin, SHeight/40, 5);
		this.beam = new Beam(this.origin, angle);
		this.speed = speed;
	}
	
	show() {
		//colorMode(HSB, 100);
		fill(frameCount%255, 255, 255);
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
			const bool = this.trace.animateTo(this.beam.reflection.ray.origin.x, this.beam.reflection.ray.origin.y, this.speed, this.speed);
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
        // this.amount = 0; // for lerp method
    }

    show() {
        noStroke();
        ellipse(this.origin.x, this.origin.y, this.r);
        for (let i = 1; i < this.n + 1; i++) {
            //fill(255, 255 / (i / 2));
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

	animateTo(X, Y, eps, speed = 10) {
		return this.animate(this.origin.x, this.origin.y, X, Y, eps + 1, speed);
	}
	
    animate(x1, y1, x2, y2, eps, speed = 10) {
        if (this.a) {
            this.a.add(this.pointing);
            this.moveTo(this.a.x, this.a.y);
            if (abs(this.a.x - this.b.x) < eps && abs(this.a.y - this.b.y) < eps) {
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
