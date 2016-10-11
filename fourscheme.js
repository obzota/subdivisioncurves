function fourscheme(data, n) {
	var poly = data.slice();
	for (var k = n - 1; k >= 0; k--) {
		var tmp = [];

		if (poly.length < 4) {
			return [];
		}

		for (var i = 0; i < 4; i++) {
			poly.push(poly[i].clone());
		}

		for (var i = 0; i < poly.length - 1; i++) {
			var a = poly[i];
			var b = poly[i+1];
			var c = poly[i+2];
			var d = poly[i+3];
			tmp.push((new THREE.Vector2()).lerpVectors(a, b, 3/16));
			tmp.push((new THREE.Vector2()).lerpVectors(a, b, 11/16));
		}
		poly = tmp.slice();
	}
	return poly;
}