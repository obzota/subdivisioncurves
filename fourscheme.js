function fourscheme(data, n) {
	var poly = data.slice();
	for (var k = n - 1; k >= 0; k--) {
		var tmp = [];

		if (poly.length < 4) {
			return [];
		}

		for (var i = 0; i < 3; i++) {
			poly.push(poly[i].clone());
		}

		for (var i = 0; i < poly.length - 3; i++) {
			var a = poly[i];
			var b = poly[i+1];
			var c = poly[i+2];
			var d = poly[i+3];

			var res = (new THREE.Vector2())
				.addScaledVector(a, -1/16)
				.addScaledVector(d, -1/16)
				.addScaledVector(b, 9/16)
				.addScaledVector(c, 9/16);
			tmp.push(b.clone());
			tmp.push(res);
		}
		poly = tmp.slice();
	}
	return poly;
}
