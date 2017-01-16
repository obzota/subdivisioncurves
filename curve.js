function Curve(data, generatingFunction) {
	this.data = data;
	this.generatingFunction = generatingFunction;
	this.color = randomColorString();
	this.update();
}

Curve.prototype.update = function() {
	this.points = this.generatingFunction(this.data, 5);
	this.curvature = curvature(this.points);
};

Curve.prototype.newRandomColor = function() {
	this.color = randomColorString();
};