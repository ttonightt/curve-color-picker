
export const RGBtoHex = ([r, g, b]) => ((r << 16) + (g << 8) + b).toString(16).padStart(6, "0");

export const HSVtoRGB = (hue, saturation, value) => {

	hue %= 360;
	hue /= 60;

	const hue1 = Math.floor(hue);
	const f =
		hue1 % 2
		?
		hue - hue1
		:
		1 - hue + hue1;

	const s = saturation / 100;
	const v = value / 100;

	const n = Math.floor(255 * v * (1 - (s * f)));
	const m = Math.floor(255 * v * (1 - s));
	const l = Math.floor(255 * v);

	switch (hue1) {
		case 0:
			return [l, n, m];
		case 1:
			return [n, l, m];
		case 2:
			return [m, l, n];
		case 3:
			return [m, n, l];
		case 4:
			return [n, m, l];
		case 5:
			return [l, m, n];
	}
};