
const fx = (t, curve) => {
	const t1 = 1 - t;
	return ((t1**3) * curve[0]) + (3 * (t1*t1) * t * curve[2]) + (3 * t1 * (t*t) * curve[4]) + ((t**3) * curve[6]);
};

const fy = (t, curve) => {
	const t1 = 1 - t;
	return ((t1**3) * curve[1]) + (3 * (t1*t1) * t * curve[3]) + (3 * t1 * (t*t) * curve[5]) + ((t**3) * curve[7]);
};

const RGB = (hue, curve, tint) => {

	hue /= 60;

	const h1 = Math.floor(hue);
	const f = (h1 % 2) ? hue - h1 : 1 - hue + h1;

	const s = getX(tint, curve) / 100;
	const _v = 1 - (getY(tint, curve) / 100);

	const n = Math.floor(255 * _v * (1 - (s * f)));
	const m = Math.floor(255 * _v * (1 - s));
	const v = Math.floor(255 * _v);

	switch (h1 % 6) {
		case 0:
			return [v, n, m];
		case 1:
			return [n, v, m];
		case 2:
			return [m, v, n];
		case 3:
			return [m, n, v];
		case 4:
			return [n, m, v];
		case 5:
			return [v, m, n];
	}
};

const HSV = (hue, curve, tint) => [
	hue,
	getX(tint, curve),
	100 - getY(tint, curve)
];

const HSL = (hue, curve, tint) => {

	const v = 100 - getY(tint, curve);
	const l = v - (v * getX(tint, curve) / 200);
	const m = Math.min(l, 100 - l);

	return [hue, m ? (v - l) / m : 0, l];
};

export default { fx, fy, RGB, HSV, HSL };