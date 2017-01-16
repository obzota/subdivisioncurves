function draw() {
	drawPoints();
	drawCurves();
}

// curves must be filled with a list of 2D polygons (2D-point lists)
function drawCurves() {
	var poly = d3.select('svg').selectAll('polyline').data(curves.toArray());
	poly.enter().append('polyline')
			.attr('fill', 'none')
		.merge(poly)
			.attr('points', function(curve) {return buildPolyString(curve.points)})
			.attr('stroke', function(curve) {return curve.color});

	poly.exit().remove();
}

function changeCurveColors() {
	d3.select('svg').selectAll('polyline').data(curves.toArray())
		.attr('stroke', randomColorString);
}

// polygon (global) must be a list of 2D points
function drawPoints() {
	var circles = d3.select('svg').selectAll('circle').data(userPoints);
	circles.attr("fill", "whitesmoke");
	circles.enter().append('circle')
		.attr("fill", "crimson")
		.attr("r", 5)
		.attr("cx", function(d) {return d.x})
		.attr("cy", function(d) {return d.y});
	circles.exit().remove();
}

//helper: build a string in the format "x1,y1 x2,y2 x3,y3, ..."
function buildPolyString(poly) {
	var str = "";
	for (var i = 0; i < poly.length; i++) {
		str += poly[i].x + "," + poly[i].y + " ";
	}
	if (poly.length > 0) {
		str += _.first(poly).x + "," + _.first(poly).y;
	}
	return str;
}

//helper: quick random color string (hex)
function randomColorString() {
	return "#"+((1<<24)*Math.random()|0).toString(16);
}