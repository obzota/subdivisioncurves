function curvature(curve) {
	var points = curve.slice();
	points.push(curve[0]);
	points.push(curve[1]);

	var angles = [];
	for (var i = 0; i < points.length - 2; i++) {
		var a = points[i];
		var b = points[i+1];
		var c = points[i+2];

		var v1 = (new THREE.Vector2()).subVectors(b,a);
		var v2 = (new THREE.Vector2()).subVectors(c,b);

		var angle = Math.acos((v1.x*v2.x+v1.y*v2.y)/v1.length()/v2.length());

		angles.push(angle);
	}
	return angles;
}

function drawCurvature(curvature, id) {
	let container = $(id);

	let w = container.width();
	let h = container.height();

	let n = curvature.length;
	let max = _.max(curvature);

	xScale = d3.scaleLinear().domain([0, n]).range([0, w]);
	yScale = d3.scaleLinear().domain([0, max*1.2]).range([h, 0]);

	let circles = d3.select(id).selectAll('circle').data(curvature);
	circles
		.enter().append('circle')
		    .attr('r', 2)
		.merge(circles)
			.attr('cx', function(data, index) {return xScale(index)})
			.attr('cy', function(data, index) {return yScale(data)});

	circles.exit().remove();
}

function drawAllCurvatures(curves) {
	drawCurvature(curves.chaikin.curvature, "#chaikin");
	drawCurvature(curves.uniformspline.curvature, "#uniformspline");
	drawCurvature(curves.fourscheme.curvature, "#fourscheme");
}

function curvatureOff() {
	let container = $('#curvature');
	container.css('display', 'none');
}

function curvatureOn() {
	let container = $('#curvature');
	container.css('display', 'flex');

	drawAllCurvatures(curves);
}