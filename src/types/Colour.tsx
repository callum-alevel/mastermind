// The 6 colours to be used in the game.
const Colours: Colour[] = [
	["blue", "#6495ED"],
	["red", "#DE3163"],
	["green", "#2ECC71"],
	["cyan", "#40E0D0"],
	["orange", "#F59A16"],
	["yellow", "#DFFF00"],
	["purple", "#9622F1"],
	["pink", "#F516E7"]
];

// The set colour names.
export type Colour = [
	"blue" | "red" | "green" | "orange" | "yellow" | "purple" | "pink" | "cyan",
	string
];

export default Colours;
