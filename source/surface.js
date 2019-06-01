class Surface {
    constructor(Ax, Ay, Bx, By) {
        this.a = createVector(Ax, Ay);
        this.b = createVector(Bx, By);

        this.transparency = 0.0;
        this.refractive_index = 1;
    }

    show() {
        stroke(255);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
    }

    getV1() {
        return this.a;
    }

    getV2() {
        return this.b;
    }
}

class Polygon {
    constructor() {

    }
}