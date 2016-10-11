"use strict";

var data = [];
var svg;
var d3svg = d3.select('svg');

function init() {
	svg = $('svg');
}

function reset() {
	data = [];
	draw();
}

function addPoint(event) {
	data.push(new THREE.Vector2(event.clientX, event.clientY));
	draw();
}

function draw() {
	drawCircle();
	drawPoly();
}

function drawCircle() {
	var circles = d3.select('svg').selectAll('circle').data(data);
	circles.attr("fill", "whitesmoke");
	circles.enter().append('circle')
		.attr("fill", "crimson")
		.attr("r", 5)
		.attr("cx", function(d) {return d.x})
		.attr("cy", function(d) {return d.y});
	circles.exit().remove();
}

function buildPolyString(n) {
	var poly = chaikin(data, n);
	var str = "";
	for (var i = 0; i < poly.length; i++) {
		str += poly[i].x + "," + poly[i].y + " ";
	}
	if (poly.length > 0) {
		str += _.first(poly).x + "," + _.first(poly).y;
	}
	return str;
}

function drawPoly() {
	var poly = d3.select('svg').selectAll('polyline').data([buildPolyString(10)]);
	poly.enter().append('polyline')
		.attr('stroke', 'whitesmoke')
		.attr('fill', 'none')
		.merge(poly)
		.attr('points', function(d) {return d});

	poly.exit().remove();
}
