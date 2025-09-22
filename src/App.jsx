import { useState } from "react";


const initPresets = [
	{
		name: "Primal",
		hue: 261,
		curve: [
			15, 5,
			86, 9,
			90, 40,
			62, 100
		],
		focusedTint: 4,
		tints: [
			{ value: 0.056 },
			{ value: 0.12 },
			{ value: 0.24 },
			{ value: 0.36 },
			{ value: 0.5 },
			{ value: 0.6 },
			{ value: 0.72 },
			{ value: 0.84 },
			{ value: 0.92 }
		],
		required: true
	},
	{
		name: "Secondary",
		hue: 340,
		curve: [
			15, 5,
			86, 9,
			90, 40,
			62, 100
		],
		focusedTint: 4,
		tints: [
			{ value: 0.056 },
			{ value: 0.12 },
			{ value: 0.24 },
			{ value: 0.36 },
			{ value: 0.5 },
			{ value: 0.6 },
			{ value: 0.72 },
			{ value: 0.84 },
			{ value: 0.92 }
		],
		required: true
	},
	{
		name: "Accent",
		hue: 170,
		curve: [
			15, 5,
			86, 9,
			90, 40,
			62, 100
		],
		focusedTint: 4,
		tints: [
			{ value: 0.056 },
			{ value: 0.12 },
			{ value: 0.24 },
			{ value: 0.36 },
			{ value: 0.5 },
			{ value: 0.6 },
			{ value: 0.69 },
			{ value: 0.78 },
			{ value: 0.88 }
		],
		required: true
	},
	{
		name: "Neutral",
		hue: 9,
		curve: [
			0, 0,
			2, 33,
			3, 80,
			9, 100
		],
		focusedTint: 4,
		tints: [
			{ value: 0.056 },
			{ value: 0.12 },
			{ value: 0.36 },
			{ value: 0.46 },
			{ value: 0.56 },
			{ value: 0.78 },
			{ value: 0.84 },
			{ value: 0.88 },
			{ value: 0.96 }
		],
		required: true
	}
];

const App = () => {

	return (
		<div className="text-2r w-screen h-screen flex items-center justify-center bg-slate-700">
			<div className="clip-rabbet-015 p-8 bg-slate-800">

			</div>
		</div>
	);
};

export default App;