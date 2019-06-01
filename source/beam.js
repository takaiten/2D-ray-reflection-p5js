class Beam {
    constructor(pos, angle, bounces, length = 20) {
        this.ray = new Ray(pos, angle);

        this.length = length;
        this.energy = 255;
        this.bounces = bounces;
    }

    lookAt(x, y) {
        this.ray.dir.x = x - this.ray.origin.x;
        this.ray.dir.y = y - this.ray.origin.y;
        this.ray.dir.normalize();
    }

    show() {
        this.ray.show(20, 'red');
        ellipse(this.ray.origin.x, this.ray.origin.y, 10);
        if (this.reflection) {
            this.reflection.show();
        }
    }

    intersect(bonds) {
        let hit = false;
        for (let bnd of bonds) {
            const pt = this.ray.intersect(bnd);
            if (pt) {
                hit = true;
                let a, b, c, closest, sgn;
                const AB = p5.Vector.dist(this.ray.origin, bnd.a);
                const AD = p5.Vector.dist(this.ray.origin, bnd.b);

                if (AB < AD) {
                    c = AB;
                    closest = bnd.a;
                } else {
                    c = AD;
                    closest = bnd.b;
                }
                a = p5.Vector.dist(pt, closest);
                b = p5.Vector.dist(this.ray.origin, pt);

                const cosPhi = (pow(a, 2) + pow(b, 2) - pow(c, 2)) / (2 * a * b);
                sgn = cosPhi > 0 ? 1 : -1;
                const phi = acos(cosPhi);
                // const phi = acos((pow(a, 2) + pow(b, 2) - pow(c, 2)) / (2 * a * b));

                if (this.bounces > 0) {
                    print(this.bounces);
                    this.reflection = new Beam(pt, this.ray.dir.heading() - sgn * 2 * phi, this.bounces - 1);
                }
                stroke(255);
                line(this.ray.origin.x, this.ray.origin.y, pt.x, pt.y);
                // ellipse(pt.x, pt.y, SHeight / 100);
            }
        }
        if (!hit) {
            delete this.reflection;
        }
        if (this.reflection) {
            this.reflection.intersect(bonds);
        }
    }
}