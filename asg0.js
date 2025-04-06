// DrawTriangle.js (c) 2012 matsuda
function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('example');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return false;
  }

  // Get the rendering context for 2DCG
  var ctx = canvas.getContext('2d');

  // Draw a black rectangle
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set color to black
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill a rectangle with the color

  var v1 = new Vector3([2.25, 2.25, 0]); // vector v1



  drawVector(v1, "red");

}

function drawVector(v, color) {
  var canvas = document.getElementById('example');
  var ctx = canvas.getContext('2d');

  // center of the canvas (origin)
  var cx = canvas.width/2;
  var cy = canvas.height/2;

  // scaling factor for vector
  var scale = 20;

  // scaled x and y components
  var x = v.elements[0] * scale;
  var y = v.elements[1] * scale;

  // draw the vector:
  ctx.beginPath();
  ctx.moveTo(cx, cy);           // start at center of the canvas
  ctx.lineTo(cx + x, cy - y);   // draw to the scaled vector's endpoint
  ctx.strokeStyle = color;
  ctx.stroke();

}

function handleDrawEvent() {
  var canvas = document.getElementById('example');
  var ctx = canvas.getContext('2d');

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw a black rectangle
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set color to black
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill a rectangle with the color

  // get the input values
  // v1:
  var x = document.getElementById('xCoord').value;
  var y = document.getElementById('yCoord').value;

  // v2:
  var x2 = document.getElementById('xCoord2').value;
  var y2 = document.getElementById('yCoord2').value;

  var v1 = new Vector3([x, y, 0]);
  var v2 = new Vector3([x2, y2, 0]);

  drawVector(v1, "red");
  drawVector(v2, "blue");
}

function handleDrawOperationEvent() {
  //handleDrawEvent();
  var canvas = document.getElementById('example');
  var ctx = canvas.getContext('2d');

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw a black rectangle
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set color to black
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill a rectangle with the color

  // get the input values
  // v1:
  var x = document.getElementById('xCoord').value;
  var y = document.getElementById('yCoord').value;

  // v2:
  var x2 = document.getElementById('xCoord2').value;
  var y2 = document.getElementById('yCoord2').value;

  var v1 = new Vector3([x, y, 0]);
  var v2 = new Vector3([x2, y2, 0]);

  drawVector(v1, "red");
  drawVector(v2, "blue");

  var operation = document.getElementById('opSelect').value
  var scalarValue = document.getElementById('scalarVal').value

  // For add and sub operations,
  // draw a green vector v3 = v1 + v2  or v3 = v1 - v2.
  if (operation == "add") {
    var v3 = new Vector3(v1.elements);
    v3.add(v2);
    drawVector(v3, "green");
  }
  else if (operation == "sub") {
    var v3 = new Vector3(v1.elements);
    v3.sub(v2);
    drawVector(v3, "green");
  }
  else if (operation == "mul") {
    var v3 = new Vector3(v1.elements);
    var v4 = new Vector3(v2.elements);

    v3.mul(scalarValue);
    v4.mul(scalarValue);

    drawVector(v3, "green");
    drawVector(v4, "green");

  }
  else if (operation == "div") {
    var v3 = new Vector3(v1.elements);
    var v4 = new Vector3(v2.elements);

    v3.div(scalarValue);
    v4.div(scalarValue);

    drawVector(v3, "green");
    drawVector(v4, "green");
  }
  else if (operation == "magnitude") {
    console.log("Magnitude v1: " + v1.magnitude());
    console.log("Magnitude v2: " + v2.magnitude());
  }
  else if (operation == "normalize") {
    var vN1 = new Vector3(v1.elements);
    var vN2 = new Vector3(v2.elements);
    vN1.normalize();
    vN2.normalize();

    drawVector(vN1, "green");
    drawVector(vN2, "green");

  }
  else if (operation == "angle") {
    var angle = angleBetween(v1, v2);
    if (angle !== null) {
        console.log("Angle: " + angle);
    }
  }
  else if (operation == "area") {
    var area = areaTriangle(v1, v2);
    console.log("Area of the triangle: " + area);

  }

}

// compute the angle between v1 and v2.
// Hint: Use the definition of dot product
// dot(v1, v2) = ||v1|| * ||v2|| * cos(alpha).
function angleBetween(v1, v2) {
  var dot = Vector3.dot(v1, v2);
  var mag1 = v1.magnitude();
  var mag2 = v2.magnitude();

  if (mag1 === 0 || mag2 === 0) {
      console.log("Cannot calculate angle with a zero-magnitude vector.");
      return null;
  }
  var cosAlpha = dot / (mag1 * mag2);
  var angleinDeg = Math.acos(cosAlpha) * (180 / Math.PI);

  return angleinDeg;

}
// compute the area of the triangle created with
// v1 and v2.
//Hint: Remember  ||v1 x v2]]  equals to the
// area of the parallelogram that the vectors span.
function areaTriangle(v1, v2) {
  var crossProduct = Vector3.cross(v1, v2);
  // magnitude of the cross product is the area of the parallelogram
  var parArea = crossProduct.magnitude();
  // triangle area is half of parallelogram area
  return parArea / 2;

}
