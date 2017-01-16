function chaikin(data, n) {
	var poly = data.slice();
	for (var k = n - 1; k >= 0; k--) {
		var tmp = [];

		if (poly.length < 3) {
			return [];
		}

		poly.push(_.first(poly).clone());
		for (var i = 0; i < poly.length - 1; i++) {
			var a = poly[i];
			var b = poly[i+1];
			tmp.push((new THREE.Vector2()).lerpVectors(a, b, 1/4));
			tmp.push((new THREE.Vector2()).lerpVectors(a, b, 3/4));
		}
		poly = tmp.slice();
	}
	return poly;
}
