// The 6 colours to be used in the game.
const Colours: Colour[] = [
	["blue", "#6495ED"],
	["red", "#DE3163"],
	["green", "#2ECC71"],
	["aqua", "#00FFFF"],
	["orange", "#F59A16"],
	["yellow", "#EFF43F"],
	["purple", "#9622F1"],
	["pink", "#F516E7"]
];

// The set colour names.
export type Colour = [
	"blue" | "red" | "green" | "orange" | "yellow" | "purple" | "pink" | "aqua",
	string
];

export default Colours;
