import { useEffect } from "react";
import CubicBezier from "../lib/curve";


const PaletteCanvas = ({ resolution, hue, curve, direction, style, className }) => {

	let w, h;

	if (direction === "vertical") {

		h = resolution;
		w = 1;
	} else {
		w = resolution;
		h = 1
	}

	const canvasRef = useRef();
	const contextRef = useRef(null);

	const hue = hue / 60;

	const curve = curve;

	useEffect(() => {

		contextRef.current = canvasRef.current.getContext("2d");
	}, []);

	useEffect(() => {

		const imd = new ImageData(w, h);

		const len4 = resolution * 4;
		const tstep = 1 / resolution;

		for (let k = 0, t = 0; k < len4; k += 4, t += tstep) {

			const s = CubicBezier.fx(t, curve) / 100;
			const v = 1 - ( CubicBezier.fy(t, curve) / 100 );

			const hue1 = Math.floor(hue);
			const f = hue1 % 2 ? hue - hue1 : 1 - hue + hue1;

			const m = v * (1 - s);
			const n = v * (1 - (s * f));

			imd.data[k + 2 - ((hue1 + 1) % 3)] = Math.floor(255 * n);
			imd.data[k + ((Math.floor(hue1 / 2) + 2) % 3)] = Math.floor(255 * m);
			imd.data[k + (Math.floor((hue1 + 1) / 2) % 3)] = Math.floor(255 * v);
			imd.data[k + 3] = 255;
		}

		contextRef.current.putImageData(imd, 0, 0);

	}, [curve, hue, direction]);

	return (
		<canvas
			width={w}
			height={h}
			style={style}
			className={className}
			ref={ref}
		></canvas>
	);
};

export default PaletteCanvas;