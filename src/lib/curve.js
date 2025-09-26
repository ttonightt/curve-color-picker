import { HSVtoRGB } from "./colors";

const fx = (t, curve) => {
	const t1 = 1 - t;
	return ((t1**3) * curve[0].x) + (3 * (t1*t1) * t * curve[1].x) + (3 * t1 * (t*t) * curve[2].x) + ((t**3) * curve[3].x);
};

const fy = (t, curve) => {
	const t1 = 1 - t;
	return ((t1**3) * curve[0].y) + (3 * (t1*t1) * t * curve[1].y) + (3 * t1 * (t*t) * curve[2].y) + ((t**3) * curve[3].y);
};

const RGB = (hue, curve, tint) => {

	return HSVtoRGB( hue, fx(tint, curve), 100 - fy(tint, curve) );
};

const HSV = (hue, curve, tint) => {

	return [ hue, fx(tint, curve), 100 - fy(tint, curve) ];
};

const HSL = (hue, curve, tint) => {

	const v = 100 - fy(tint, curve);
	const l = v - (v * fx(tint, curve) / 200);
	const m = Math.min(l, 100 - l);

	return [ hue, m ? (v - l) / m : 0, l ];
};

export default { fx, fy, RGB, HSV, HSL };