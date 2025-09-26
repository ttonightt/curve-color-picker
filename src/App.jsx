import { useState } from "react";
import SaturationValuePicker from "./components/SaturationValuePicker";
import usePresets from "./hooks/usePresets";


const initPresets = [
	{
		name: "Primal",
		hue: 261,
		curve: [
			{x: 15, y:   5},
			{x: 86, y:   9},
			{x: 90, y:  40},
			{x: 62, y: 100}
		],
		tints: [
			0.056,
			0.12,
			0.24,
			0.36,
			0.5,
			0.6,
			0.72,
			0.84,
			0.92
		]
	},
	{
		name: "Secondary",
		hue: 340,
		curve: [
			{x: 15, y:   5},
			{x: 86, y:   9},
			{x: 90, y:  40},
			{x: 62, y: 100}
		],
		tints: [
			0.056,
			0.12,
			0.24,
			0.36,
			0.5,
			0.6,
			0.72,
			0.84,
			0.92
		]
	},
	{
		name: "Accent",
		hue: 170,
		curve: [
			{x: 15, y:   5},
			{x: 86, y:   9},
			{x: 90, y:  40},
			{x: 62, y: 100}
		],
		tints: [
			0.056,
			0.12,
			0.24,
			0.36,
			0.5,
			0.6,
			0.69,
			0.78,
			0.88
		]
	},
	{
		name: "Neutral",
		hue: 9,
		curve: [
			{x: 0, y:   0},
			{x: 2, y:  33},
			{x: 3, y:  80},
			{x: 9, y: 100}
		],
		tints: [
			0.056,
			0.12,
			0.36,
			0.46,
			0.56,
			0.78,
			0.84,
			0.88,
			0.96
		]
	}
];

const App = () => {

	const [presets, { setName, setHue, setTints, setCurve }] = usePresets(initPresets);

	const [focused, setFocused] = useState(0);

	const preset = presets[ focused ];

	return (
		<div className="text-2r w-screen h-screen flex items-center justify-center bg-slate-700">
			<div className="clip-rabbet-015 p-8 bg-slate-800">
				<SaturationValuePicker
					width={200}
					height={200}
					hue={preset.hue}
					ofCurve={preset.curve}
					setCurveBy={curve => setCurve(focused, curve)}
					ofPointers={preset.tints}
					setPointersBy={tints => setTints(focused, tints)}
				/>
			</div>
		</div>
	);
};

export default App;