// The 8 colours to be used in the game.
const Colours: Colour[] = [
	["blue", "#6495ED"],
	["red", "#F72C48"],
	["green", "#2ECC71"],
	["aqua", "#00FFFF"],
	["orange", "#F4863F"],
	["yellow", "#EFF43F"],
	["purple", "#982CF7"],
	["pink", "#F516E7"],
	["grey", "#777"],
	["white", "#eee"]
];

// The set colour names.
export type Colour = [
	(
		| "blue"
		| "red"
		| "green"
		| "orange"
		| "yellow"
		| "purple"
		| "pink"
		| "aqua"
		| "grey"
		| "white"
	),
	string
];

export default Colours;
