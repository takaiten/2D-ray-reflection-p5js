class Surface {
    constructor(Ax, Ay, Bx, By, specular = 1) {
        this.a = createVector(Ax, Ay);
        this.b = createVector(Bx, By);

        this.specular = specular;
    }

    show() {
        stroke(0);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
    }

    getV1() {
        return this.a;
    }

    getV2() {
        return this.b;
    }
}

class Circle {
    constructor(X, Y, radius, segments) {
        this.lines = [];
        this.radius = radius;
        this.origin = createVector(X, Y);

        const ang = 2 * PI / segments;
        for (let a = 0; a < (2 * PI + ang); a += ang) {
            this.lines.push(new Surface(this.origin.x + radius * cos(a), this.origin.y + radius * sin(a),
                this.origin.x + radius * cos(a + ang), this.origin.y + radius * sin(a + ang)));
        }
    }

    moveTo(X, Y) {
        this.origin.set(X, Y);
    }

    show() {
        for (let i = 0; i < this.lines.length - 1; i++) {
            this.lines[i].show();
        }
    }

    getSurfaceArray() {
        return this.lines;
    }
}
