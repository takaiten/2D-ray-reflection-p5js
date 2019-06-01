const drawType = {
  "LINES": 0,
  "FILL": 1
};

class LightSource {
  constructor(numberOfRays = 100, moveable = true) {
    this.moveable = moveable;
    this.origin = createVector(width / 2, height / 2);
    this.rays = [];

    for (let a = 0; a < 360; a += 360 / numberOfRays) {
      this.rays.push(new Ray(this.origin, radians(a)));
    }
  }

  changePos(x, y) {
    if (this.moveable)
      this.origin.set(x, y);
  }

  cast(walls, type = drawType.LINES) {
    // FOR FILL
    if (type == drawType.FILL) {
      push();
      noStroke();
      fill(200, 102);
      beginShape();
    }
    
    for (let i = 0; i < this.rays.length; i++) {
      // current ray
      const ray = this.rays[i];
      let closest = null;
      let record = Infinity;
      
      for (let wall of walls) {
        // find the point of intersection
        const pt = ray.intersect(wall);
        if (pt) {
          const d = p5.Vector.dist(this.origin, pt);
          if (d < record) {
            record = d;
            closest = pt;
          }
        }
      }
      // if point is closest - draw
      if (closest) {
        // DRAW ONLY LINES 
        if (type == drawType.LINES) {
          stroke(255, 180);
          line(this.origin.x, this.origin.y, closest.x, closest.y);
        }
        // MAKE VERTEX FOR FILLED 
        else if (type == drawType.FILL) {
          vertex(closest.x, closest.y);
        }
      }
    }
    // FOR FILL
    if (type == drawType.FILL) {
      endShape();
      pop();
    }
  }
}
