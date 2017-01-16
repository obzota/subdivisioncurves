function uniformspline3(data, n) {
	var poly = data.slice();
	for (var k = n - 1; k >= 0; k--) {
		var tmp = [];

		if (poly.length < 3) {
			return [];
		}

		// push two points for perfect loop
		poly.push(poly[0].clone());
		poly.push(poly[1].clone());
		for (var i = 0; i < poly.length - 2; i++) {
			var a = poly[i];
			var b = poly[i+1];
			var c = poly[i+2];
			tmp.push(
				(new THREE.Vector2())
					.addScaledVector(a, 1/2)
					.addScaledVector(b, 1/2)
				);
			tmp.push(
				(new THREE.Vector2())
					.addScaledVector(a, 1/8)
					.addScaledVector(b, 6/8)
					.addScaledVector(c, 1/8)
				);
		}
		poly = tmp.slice();
	}
	return poly;
}
