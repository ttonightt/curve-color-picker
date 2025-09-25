

const SaturationValuePicker = ({ width, height, hue, interfaceSize, className, style, ofCurve: curve, setCurveBy, ofPointers, setPointersBy, onPointerFocus, onPointerBlur }) => {

	width = parseInt(width) || 100;
	height = parseInt(height) || 100;

	const factor = { x: width / 100, y: height / 100 };

	const infc = props.interfaceSize > 0 ? parseInt(props.interfaceSize) : 2;
	const poiR = 2 * infc;

	const svgRef = useRef();

	const focused = useState(-1);

	const handleControlMouseDown = i => {

		focus.current = i;
		document.documentElement.classList.add("*:cursor-grabbing!");
	};

	const handleDocumentMouseMove = e => {

		const { top, left, right, bottom } = svgRef.current.getBoundingClientRect();

		const curve_ = [...curve];

		if (fc % 3) {
			// x
			curve_[focused].x = (e.clientX - left) / factor.x;
			// y
			curve_[focused].y = (e.clientY - top) / factor.y;
		} else {
			// x
			curve_[focused].x = (Math.min(Math.max(e.clientX, left), right) - left) / factor.x;
			// y
			curve_[focused].y = (Math.min(Math.max(e.clientY, top), bottom) - top) / factor.y;
		}

		props.setCurveBy(curve_);
	};

	const handleDocumentMouseUp = () => {

		document.documentElement.classList.remove("*:cursor-grabbing!");

		window.removeEventListener("mousemove", handleDocumentMouseMove);
		window.removeEventListener("mouseup", handleDocumentMouseUp);

		if (props.onControlRelease)
			props.onControlRelease();
	};

	useEffect(() => {

		window.addEventListener("mousemove", handleDocumentMouseMove);
		window.addEventListener("mouseup", handleDocumentMouseUp);

		return () => {

			window.removeEventListener("mouseup", handleDocumentMouseUp);
			window.removeEventListener("mousemove", handleDocumentMouseMove);
		};
	}, [focus]);
	
	const cx0 = Math.floor(curve[0] * wc), cx1 = Math.floor(curve[2] * wc), cx2 = Math.floor(curve[4] * wc), cx = Math.floor(curve[6] * wc);
	const cy0 = Math.floor(curve[1] * hc), cy1 = Math.floor(curve[3] * hc), cy2 = Math.floor(curve[5] * hc), cy = Math.floor(curve[7] * hc);

	return (
		<svg
			ref={ref}
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
					<stop offset="100%" stopColor={pureHueToRGB(hue)}/>
				</linearGradient>

				<linearGradient id="ihue" gradientTransform="rotate(0)">
					<stop offset="0%" stopColor="#000"/>
					<stop offset="100%" stopColor={pureHueToRGB(hue + 180)}/>
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

					<line x1={cx0} y1={cy0} x2={cx1} y2={cy1} stroke="url(#inverted)" strokeWidth={infc * 2 / 3}/>
					<line x1={cx} y1={cy} x2={cx2} y2={cy2} stroke="url(#inverted)" strokeWidth={infc * 2 / 3}/>
				</pattern>

				<mask id="mask">
					<rect x="0" y="0" width="100%" height="100%" fill="white" stroke="none"/>

					{props.ofPointers.map((t, i) => (
						<circle key={i} cx={getX(t, curve) * wc} cy={getY(t, curve) * hc} r={3 * infc} fill="black" stroke="none"/>
					))}
				</mask>

				<polygon points={`${
					-1.5 * infc
				},${
					-2.5 * infc
				} ${
					3 * infc
				},0 ${
					-1.5 * infc
				},${
					2.5 * infc
				}`} id={"r-triangle-" + infc}/>
			</defs>

			<line x1={cx0} y1={cy0} x2={cx1} y2={cy1} stroke="white" strokeWidth={infc * 2 / 3}/>
			<line x1={cx} y1={cy} x2={cx2} y2={cy2} stroke="white" strokeWidth={infc * 2 / 3}/>

			<rect x="0" y="0" width="100%" height="100%" fill="url(#SV)"/>

			<path
				d={`M ${cx0} ${cy0} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${cx} ${cy}`}
				mask="url(#mask)"
				stroke="url(#inverted)"
				strokeWidth={infc}
				fill="none"
			/>

			{props.ofPointers.map((t, i) => (
				<circle
					key={i}
					cx={getX(t, curve) * wc}
					cy={getY(t, curve) * hc}
					r={3 * infc}
					strokeWidth={infc}
					fill="none"
					stroke="url(#inverted)"
					// stroke="white"
					// filter="drop-shadow(0 0 1.5px black)"
				/>
			))}

			<use
				x={cx0}
				y={cy0}
				href={"#r-triangle-" + infc}
				fill="white"
				stroke="black"
				cursor="grab"
				strokeWidth={infc}
				onMouseDown={e => handleControlMouseDown(0)}
			/>
			<circle
				cx={cx}
				cy={cy}
				r={poiR}
				fill="white"
				stroke="black"
				cursor="grab"
				strokeWidth={infc}
				onMouseDown={e => handleControlMouseDown(3)}
			/>

			<rect
				x={cx1 - poiR}
				y={cy1 - poiR}
				width={poiR * 2}
				height={poiR * 2}
				fill="white"
				stroke="black"
				cursor="grab"
				strokeWidth={infc}
				onMouseDown={e => handleControlMouseDown(1)}
			/>
			<rect
				x={cx2 - poiR}
				y={cy2 - poiR}
				width={poiR * 2}
				height={poiR * 2}
				fill="white"
				stroke="black"
				cursor="grab"
				strokeWidth={infc}
				onMouseDown={e => handleControlMouseDown(2)}
			/>
		</svg>
	);
};

export default SaturationValuePicker;