let facemesh;
let video;
let predictions = [];
const points = [409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on("predict", results => {
    predictions = results;
  });
}

function modelReady() {
  console.log("Facemesh model loaded!");
}

function draw() {
  image(video, 0, 0, width, height);

  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;

    stroke(0, 0, 255); // 藍色
    strokeWeight(5); // 線條粗細
    noFill();

    beginShape();
    for (let i = 0; i < points.length; i++) {
      const pointIndex = points[i];
      const [x, y] = keypoints[pointIndex];
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}
