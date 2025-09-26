import { useEffect, useRef, useState } from "react";
import { HSVtoRGB } from "../lib/colors";
import BezierCurve from "../lib/curve";


const SaturationValuePicker = ({ width, height, hue, interfaceSize, className, style, ofCurve: curve, setCurveBy, ofPointers, setPointersBy, onPointerFocus, onPointerBlur }) => {

	width = parseInt(width) || 100;
	height = parseInt(height) || 100;

	const factor = { x: width / 100, y: height / 100 };

	const svgRef = useRef();

	const [focused, setFocused] = useState(-1);

	const handleControlMouseDown = i => {

		setFocused(i);
		document.documentElement.classList.add("*:cursor-grabbing!");
	};

	const handleDocumentMouseMove = e => {

		const { top, left, right, bottom } = svgRef.current.getBoundingClientRect();

		const curve_ = [...curve];

		if (focused % 3) {

			curve_[focused].x = (e.clientX - left) / factor.x;
			curve_[focused].y = (e.clientY - top) / factor.y;

		} else {

			curve_[focused].x = (Math.min(Math.max(e.clientX, left), right) - left) / factor.x;
			curve_[focused].y = (Math.min(Math.max(e.clientY, top), bottom) - top) / factor.y;
		}

		setCurveBy(curve_);
	};

	const handleDocumentMouseUp = () => {

		document.documentElement.classList.remove("*:cursor-grabbing!");

		window.removeEventListener("mousemove", handleDocumentMouseMove);
		window.removeEventListener("mouseup", handleDocumentMouseUp);

		if (onPointerBlur) onPointerBlur();
	};

	useEffect(() => {

		if (focused > -1) {

			window.addEventListener("mousemove", handleDocumentMouseMove);
			window.addEventListener("mouseup", handleDocumentMouseUp);

			return () => {

				window.removeEventListener("mouseup", handleDocumentMouseUp);
				window.removeEventListener("mousemove", handleDocumentMouseMove);
			};
		}
	}, [focused]);

	const c = curve.map( item => ({ x: item.x * factor.x, y: item.y * factor.y }) );

	const size = interfaceSize > 0 ? parseInt(interfaceSize) : 2;
	const R = 2 * size;

	return (
		<svg
			ref={svgRef}
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			className={`relative overflow-visible ${className}`}
			width={width}
			height={height}
			viewBox={`0 0 ${width} ${height}`}
			preserveAspectRatio="none"
			style={style}
		>
			<defs>
				<linearGradient id="hue" gradientTransform="rotate(0)">
					<stop offset="0%" stopColor="#fff"/>
					<stop offset="100%" stopColor={`rgb(${ HSVtoRGB( hue, 100, 100 ).join() })`}/>
				</linearGradient>

				<linearGradient id="ihue" gradientTransform="rotate(0)">
					<stop offset="0%" stopColor="#000"/>
					<stop offset="100%" stopColor={`rgb(${ HSVtoRGB( hue + 180, 100, 100 ).join() })`}/>
				</linearGradient>

				<linearGradient id="darkness" gradientTransform="rotate(90)">
					<stop offset="0%" stopColor="#0000"/>
					<stop offset="100%" stopColor="#000"/>
				</linearGradient>

				<linearGradient id="lightness" gradientTransform="rotate(90)">
					<stop offset="0%" stopColor="#fff0"/>
					<stop offset="100%" stopColor="#fff"/>
				</linearGradient>

				<pattern id="inverted" width="100%" height="100%" patternUnits="userSpaceOnUse">
					<rect x="0" y="0" width="100%" height="100%" fill="url(#ihue)"/>
					<rect x="0" y="0" width="100%" height="100%" fill="url(#lightness)"/>
				</pattern>

				<pattern id="SV" width="100%" height="100%" patternUnits="userSpaceOnUse">
					<rect x="0" y="0" width="100%" height="100%" fill="url(#hue)"/>
					<rect x="0" y="0" width="100%" height="100%" fill="url(#darkness)"/>

					<line x1={c[0].x} y1={c[0].y} x2={c[1].x} y2={c[1].y} stroke="url(#inverted)" strokeWidth={size * 2 / 3}/>
					<line x1={c[3].x} y1={c[3].y} x2={c[2].x} y2={c[2].y} stroke="url(#inverted)" strokeWidth={size * 2 / 3}/>
				</pattern>

				<mask id="mask">
					<rect x="0" y="0" width="100%" height="100%" fill="white" stroke="none"/>

					{ofPointers.map((t, i) => (
						<circle key={i} cx={ BezierCurve.fx(t, curve) * factor.x } cy={ BezierCurve.fy(t, curve) * factor.y } r={3 * size} fill="black" stroke="none"/>
					))}
				</mask>

				<polygon points={`${
					-1.5 * size
				},${
					-2.5 * size
				} ${
					3 * size
				},0 ${
					-1.5 * size
				},${
					2.5 * size
				}`} id={"r-triangle-" + size}/>
			</defs>

			<line x1={c[0].x} y1={c[0].y} x2={c[1].x} y2={c[1].y} stroke="white" strokeWidth={size * 2 / 3}/>
			<line x1={c[3].x} y1={c[3].y} x2={c[2].x} y2={c[2].y} stroke="white" strokeWidth={size * 2 / 3}/>

			<rect x="0" y="0" width="100%" height="100%" fill="url(#SV)"/>

			<path
				d={`M ${c[0].x} ${c[0].y} C ${c[1].x} ${c[1].y}, ${c[2].x} ${c[2].y}, ${c[3].x} ${c[3].y}`}
				mask="url(#mask)"
				stroke="url(#inverted)"
				strokeWidth={size}
				fill="none"
			/>

			{ofPointers.map((t, i) => (
				<circle
					key={i}
					cx={ BezierCurve.fx(t, curve) * factor.x }
					cy={ BezierCurve.fy(t, curve) * factor.y }
					r={3 * size}
					strokeWidth={size}
					fill="none"
					stroke="url(#inverted)"
				/>
			))}

			<use
				x={c[0].x}
				y={c[0].y}
				href={"#r-triangle-" + size}
				fill="white"
				stroke="black"
				cursor="grab"
				strokeWidth={size}
				onMouseDown={e => handleControlMouseDown(0)}
			/>
			<circle
				cx={c[3].x}
				cy={c[3].y}
				r={R}
				fill="white"
				stroke="black"
				cursor="grab"
				strokeWidth={size}
				onMouseDown={e => handleControlMouseDown(3)}
			/>

			<rect
				x={c[1].x - R}
				y={c[1].y - R}
				width={R * 2}
				height={R * 2}
				fill="white"
				stroke="black"
				cursor="grab"
				strokeWidth={size}
				onMouseDown={e => handleControlMouseDown(1)}
			/>
			<rect
				x={c[2].x - R}
				y={c[2].y - R}
				width={R * 2}
				height={R * 2}
				fill="white"
				stroke="black"
				cursor="grab"
				strokeWidth={size}
				onMouseDown={e => handleControlMouseDown(2)}
			/>
		</svg>
	);
};

export default SaturationValuePicker;