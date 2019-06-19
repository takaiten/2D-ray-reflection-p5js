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

    show() {
        this.ray.show(10, 'red');
        ellipse(this.ray.origin.x, this.ray.origin.y, 5);
        if (this.reflection) {
            this.reflection.show();
        }
    }
    showTrajectory() {
        if (this.closest){
            line(this.ray.origin.x, this.ray.origin.y, this.closest.x, this.closest.y);
        }
    }
    showDottedTrajectory() {
        if (this.closest){
            dottedLine(this.ray.origin, this.closest);
        }
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
                if (d < record && d > 1e-5) {
                    record = d;
                    closest = {point: pt, wall: walls[i]};
                }
            }
        }

        if (closest) {
            this.closest = closest;

            if (this.bounces > 0) {
                this.reflection = new Beam(closest.point, this.getReflectionAngle(closest.wall), this.bounces - 1, int(this.power * closest.wall.specular));
                this.reflection.reflectFrom(walls);
            }
        } else {
            delete this.reflection;
        }
    }

    getRay() {
        return this.ray;
    }
    getReflectionRay() {
        return this.reflection;
    }
    getClosest() {
        return this.closest;
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
