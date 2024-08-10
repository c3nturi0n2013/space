let { initKeys, keyPressed } = kontra;
// Home for all sprites of the game
let sprites = [];

// Helper method to create new asteroids
function createAsteroid() {
  return kontra.Sprite({
    type: "asteroid",
    x: 100,
    y: 100,
    dx: Math.random() * 4 - 2,
    dy: Math.random() * 4 - 2,
    radius: 30,
    render() {
      this.context.strokeStyle = "white";
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      this.context.stroke();
    },
  });
}

// helper function to convert degrees to radians
function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

// Initialize the Kontra.js framework
kontra.init();

// Tell Kontra.js to observe key presses
initKeys();

// Create 4 asteroids
for (let i = 0; i < 4; i++) {
  sprites.push(createAsteroid());
}

// Create the ship sprite
let ship = kontra.Sprite({
  x: kontra.getCanvas().width / 4, // Center of the canvas
  y: kontra.getCanvas().height / 4, // Center of the canvas
  width: 6,
  rotation: 0, // 0 degrees is to the right
  render() {
    this.context.save();

    // translate to the ship's position
    this.context.translate(this.x, this.y);

    // rotate around the ship's center
    this.context.rotate(degreesToRadians(this.rotation));

    // Set the drawing style
    this.context.strokeStyle = "white";

    this.context.beginPath();

    // draw the triangle centered around the origin (0, 0)
    this.context.moveTo(-10, -10); // Adjusted to center the triangle
    this.context.lineTo(15, 0);
    this.context.lineTo(-10, 10);

    this.context.closePath();
    this.context.stroke();

    this.context.restore();
  },
  update() {
    // rotate the ship left or right
    if (keyPressed("arrowleft")) {
      this.rotation -= 4; // subtract to rotate left
    }
    if (keyPressed("arrowright")) {
      this.rotation += 4; // add to rotate right
    }
  },
});

sprites.push(ship);

// Initialize and start the game loop
let loop = kontra.GameLoop({
  update() {
    sprites.forEach((s) => {
      // Recalculate the position or rotation
      s.update();
    });
  },

  render() {
    sprites.forEach((s) => s.render());
  },
});
loop.start();
