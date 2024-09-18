let model;
let webcam;
let webcamElement = document.getElementById("webcam");
let capturing = false;

async function capture() {
  capturing = true;

  while (capturing) {
    const img = await webcam.capture();
    const predictions = await model.estimateFaces(img);

    if (predictions.length > 0) {
      let a = [];
      b = [];
      c = [];
      for (let i = 0; i < predictions.length; i++) {
        const keypoints = predictions[i].mesh;
        // Log facial keypoints.
        for (let i = 0; i < keypoints.length; i++) {
          const [x, y, z] = keypoints[i];
          a.push(y);
          b.push(x);
          c.push(z);
        }
      }

      Plotly.newPlot(
        "plot",
        [
          {
            x: a,
            y: b,
            z: c,
            type: type,
            mode: "markers",
            color: "#E37222aa",
            marker: {
              size: 2,
              line: {
                color: "#000000",
                width: 0.5,
              },
              opacity: 0.8,
            },
          },
        ],
        {
          margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 0,
          },
          paper_bgcolor: "rgba(0,0,0,0)",
          plot_bgcolor: "rgba(0,0,0,0)",
          scene: {
            // Correct nesting for 3D axes
            xaxis: {
              showgrid: false,
              zeroline: false,
              visible: false,
            },
            yaxis: {
              showgrid: false,
              zeroline: false,
              visible: false,
            },
            zaxis: {
              showgrid: false,
              zeroline: false,
              visible: false,
            },
            camera: camera, // Add the camera object
          },
        }
      );
    }
  }
}

var camera = {
  eye: { x: 0, y: 0, z: -1.5 }, // Positions the camera in front of the face
  center: { x: 0, y: 0, z: 0 }, // Centers the view on the plot
  up: { x: 0, y: 1, z: 0 }, // Ensures the y-axis is oriented upwards
};

var type = "scatter3d";

async function main() {
  // Load the MediaPipe facemesh model.
  model = await facemesh.load();
  console.log("Model loaded");

  webcam = await tf.data.webcam(webcamElement);
  const imgtemp = await webcam.capture();
  imgtemp.dispose();

  document.getElementById("capture").addEventListener("click", function () {
    capture();
    $("#capture").hide();
    $("#stop").show();
  });

  document.getElementById("stop").addEventListener("click", function () {
    capturing = false;
    $("#capture").show();
    $("#stop").hide();
  });

  $("#changeView").click(function () {
    if (type === "scatter3d") {
      type = "mesh3d";
    } else {
      type = "scatter3d";
    }
  });
}

main();
