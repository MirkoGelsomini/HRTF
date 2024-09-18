d3.csv(
  "https://raw.githubusercontent.com/plotly/datasets/master/3d-scatter.csv",
  function (err, rows) {
    function unpack(rows, key) {
      return rows.map(function (row) {
        return row[key];
      });
    }

    var trace1 = {
      x: unpack(rows, "x1"),
      y: unpack(rows, "y1"),
      z: unpack(rows, "z1"),
      mode: "markers",
      marker: {
        size: 1,
		    color: "rgb(127, 127, 127, 0)",
        line: {
          color: "#E37222aa",
          width: 0.5,
        },
        opacity: 0.8,
      },
      type: "scatter3d",
    };

    var trace2 = {
      x: unpack(rows, "x2"),
      y: unpack(rows, "y2"),
      z: unpack(rows, "z2"),
      mode: "markers",
      marker: {
        color: "rgb(127, 127, 127, 0)",
        size: 1,
        symbol: "circle",
        line: {
          color: "rgb(204, 204, 204, 0)",
          width: 1,
        },
        opacity: 0.8,
      },
      type: "scatter3d",
    };

    var data = [trace1, trace2];
    var layout = {
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
	  },
    };
    Plotly.newPlot("myDiv", data, layout);
  }
);
