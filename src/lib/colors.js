
export const RGBtoHex = ([r, g, b]) => ((r << 16) + (g << 8) + b).toString(16).padStart(6, "0");

export const HueToBrightestRGB = hue => {

	hue /= 60;

	const h1 = Math.floor(hue);
	const n = Math.floor(
		255 * (
			(h1 % 2) ? 1 - hue + h1 : hue - h1
		)
	);

	switch (h1 % 6) {
		case 0:
			return "rgb(255," + n + ",0)";
		case 1:
			return "rgb(" + n + ",255,0)";
		case 2:
			return "rgb(0,255," + n + ")";
		case 3:
			return "rgb(0," + n + ",255)";
		case 4:
			return "rgb(" + n + ",0,255)";
		case 5:
			return "rgb(255,0," + n + ")";
	}
};