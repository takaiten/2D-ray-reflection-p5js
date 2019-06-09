class Ray {
    constructor(pos, angle) {
        this.origin = pos;
        this.dir = p5.Vector.fromAngle(angle);
    }

    intersect(bnd) {
        const v1 = bnd.getV1();
        const v2 = bnd.getV2();
        const v3 = this.origin;
        const v4 = p5.Vector.add(this.dir, this.origin);

        const den = (v1.x - v2.x) * (v3.y - v4.y) - (v1.y - v2.y) * (v3.x - v4.x);
        if (den == 0) {
            return;
        }

        const t = ((v1.x - v3.x) * (v3.y - v4.y) - (v1.y - v3.y) * (v3.x - v4.x)) / den;
        const u = -((v1.x - v2.x) * (v1.y - v3.y) - (v1.y - v2.y) * (v1.x - v3.x)) / den;

        if ((t >= 0 && t <= 1) && (u >= 0)) {
            return createVector(v1.x + t * (v2.x - v1.x), v1.y + t * (v2.y - v1.y));
        } else {
            return;
        }
    }

    show(length = 1, clr = 255) {
        push();
        stroke(clr);
        translate(this.origin.x, this.origin.y);
        line(0, 0, this.dir.x * length, this.dir.y * length);
        pop();
    }
}
