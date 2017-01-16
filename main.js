"use strict";

var userPoints = []; // used in draw.js
var curves = { // also used in draw.js
	chaikin: new Curve(userPoints, chaikin),
	uniformspline: new Curve(userPoints, uniformspline3),
	fourscheme: new Curve(userPoints, fourscheme),
	toArray: function () {
		return [this.chaikin, this.uniformspline, this.fourscheme];
	}
};
var svg;
var d3svg = d3.select('svg');
//var curvatureDiv = $('#curvature');

function init() {
	svg = $('svg');
}

function reset() {
	while(!_.isEmpty(userPoints)) {
		userPoints.pop();
	}
	updateCurves();
}

function addPoint(event) {
	userPoints.push(new THREE.Vector2(event.clientX, event.clientY));
	updateCurves();
}

function updateCurves() {
	curves.chaikin.update();
	curves.uniformspline.update();
	curves.fourscheme.update();
	draw();
}

function changeColors() {
	curves.chaikin.newRandomColor();
	curves.uniformspline.newRandomColor();
	curves.fourscheme.newRandomColor();
	drawCurves();
}

function showCurvature() {
	drawCurvature(curves);
}