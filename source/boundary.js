class Boundary {
  constructor(fromX, fromY, toX, toY) {
    this.a = createVector(fromX, fromY);
    this.b = createVector(toX, toY);
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
