import { useState } from "react";


const usePresets = init => {

	const [presets, setPresets] = useState(init);

	const setName = (index, name) => {

		setPresets( state => state.map(

			(item, i) => index === i ? { ...item, name } : item
		));
	};

	const setHue = (index, hue) => {

		setPresets( state => state.map(

			(item, i) => index === i ? { ...item, hue } : item
		));
	};

	const setCurve = (index, curve) => {

		setPresets( state => state.map(

			(item, i) => index === i ? { ...item, curve } : item
		));
	};

	const setTints = (index, tints) => {

		setPresets( state => state.map(

			(item, i) => index === i ? { ...item, tints } : item
		));
	};

	return [presets, { setName, setHue, setCurve, setTints }];
};

export default usePresets;