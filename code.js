kontra.init();

let asteroid = kontra.Sprite({
  type: "asteroid",
  x: 50,
  y: 50,
  dx: Math.random() * 4 - 2,
  dy: Math.random() * 4 - 2,
  radius: 30,
  render() {
    this.context.strokeStyle = "white";
    this.context.fillStyle = "gray";
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.context.stroke();
    this.context.fill();
  },
});
asteroid.render();