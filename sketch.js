let facemesh;
let video;
let predictions = [];
const points = [409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291];
const leftEyePoints = [243, 190, 56, 28, 27, 29, 30, 247, 130, 25, 110, 24, 23, 22, 26, 112];
const rightEyePoints = [359, 467, 260, 259, 257, 258, 286, 444, 463, 341, 256, 252, 253, 254, 339, 255];

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

    // 繪製主要輪廓
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

    // 繪製左眼輪廓
    stroke(255, 0, 0); // 紅色
    strokeWeight(2); // 線條粗細
    for (let i = 0; i < leftEyePoints.length - 1; i++) {
      const [x1, y1] = keypoints[leftEyePoints[i]];
      const [x2, y2] = keypoints[leftEyePoints[i + 1]];
      line(x1, y1, x2, y2);
    }

    // 將左眼的最後一點連回第一點
    const [xStart, yStart] = keypoints[leftEyePoints[0]];
    const [xEnd, yEnd] = keypoints[leftEyePoints[leftEyePoints.length - 1]];
    line(xStart, yStart, xEnd, yEnd);

    // 繪製右眼輪廓
    stroke(0, 255, 0); // 綠色
    strokeWeight(2); // 線條粗細
    for (let i = 0; i < rightEyePoints.length - 1; i++) {
      const [x1, y1] = keypoints[rightEyePoints[i]];
      const [x2, y2] = keypoints[rightEyePoints[i + 1]];
      line(x1, y1, x2, y2);
    }

    // 將右眼的最後一點連回第一點
    const [xStartRight, yStartRight] = keypoints[rightEyePoints[0]];
    const [xEndRight, yEndRight] = keypoints[rightEyePoints[rightEyePoints.length - 1]];
    line(xStartRight, yStartRight, xEndRight, yEndRight);
  }
}
