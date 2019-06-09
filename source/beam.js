class Beam {
    constructor(pos, angle, bounces = 1, power = 255) {
        this.ray = new Ray(pos, angle);
        this.bounces = bounces;
        this.power = power;
    }

    moveTo(X, Y) {
        this.ray.origin.set(X, Y);
    }
    moveBy(X, Y) {
        this.ray.origin.x += X;
        this.ray.origin.y += Y;
    }
    lookAt(X, Y) {
        this.ray.dir.x = X - this.ray.origin.x;
        this.ray.dir.y = Y - this.ray.origin.y;
        this.ray.dir.normalize();
    }
    rotate(speed) {
        this.ray.dir.rotate(frameCount % (2 * PI) * 0.0001 * speed);
    }

    // shows origin and direction of ray
    show() {
        this.ray.show(10, 'red');
        ellipse(this.ray.origin.x, this.ray.origin.y, 5);
        if (this.reflection) {
            this.reflection.show();
        }
    }
    // find normal from ray origin to line
    norm(bnds) {
        const A = p5.Vector.sub(bnds.a, bnds.b);
        const B = p5.Vector.sub(this.ray.origin, bnds.b);
        const dp = A.dot(B);
        const len = A.magSq();

        const p = createVector(bnds.b.x + (dp * A.x) / len,
            bnds.b.y + (dp * A.y) / len);

        ellipse(p.x, p.y, 10);
    }

    getReflectionAngle(bound) {
        // find the directional vector for bound
        const diff = p5.Vector.sub(bound.a, bound.b).normalize();

        // create normal vector
        const normal = createVector(diff.y, -diff.x);

        // determine if angle between normal and ray direction is more then PI
        const sign = Math.sign(this.ray.dir.x * normal.y - this.ray.dir.y * normal.x);
        let phi = PI + sign * acos(this.ray.dir.dot(normal));

        return normal.heading() + phi;
    }
    reflectFrom(walls) {
        let closest = null;
        let record = Infinity;
        for (let i = 0; i < walls.length; i++) {
            const pt = this.ray.intersect(walls[i]);
            if (pt) {
                const d = p5.Vector.dist(this.ray.origin, pt);
                if (d < record && d > 1e-10) {
                    record = d;
                    closest = {point: pt, wall: walls[i]};
                }
            }
        }

        if (closest) {
            stroke(this.power, 220);
            line(this.ray.origin.x, this.ray.origin.y, closest.point.x, closest.point.y);

            if (this.bounces > 0) {
                this.reflection = new Beam(closest.point, this.getReflectionAngle(closest.wall), this.bounces - 1, int(this.power * closest.wall.specular));
                this.reflection.reflectFrom(walls);
            }
        } else {
            delete this.reflection;
        }
    }
}

class BeamArea {
    constructor(pos, N, fov = 2 * PI, bounces = 1) {
        this.beams = [];
        this.origin = pos;
        this.fov = fov;
        let ang = this.fov / N;
        for (let a = -this.fov / 2; a < this.fov / 2; a += ang) {
            this.beams.push(new Beam(this.origin, a, bounces));
        }
    }

    moveTo(X, Y) {
        this.origin.set(X, Y);
    }

    reflectFrom(walls) {
        for (const beam of this.beams) {
            beam.reflectFrom(walls);
        }
    }
}