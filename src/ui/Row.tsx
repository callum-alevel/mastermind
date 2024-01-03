// The class for each row of the Board

import React from "react";
import Circle from "./Circle";
import Colours, { Colour } from "../types/Colour";

class Row extends React.Component<
	//typings
	{
		active: boolean;
		sequence: Colour[];
		id: number;
		submitRow: Function;
		getColours: Function;
	},
	{
		active: boolean;
		colours: (Colour | undefined)[];
		count: Record<
			string,
			{ total: number; inArray: number; correctPlace: number }
		>;
		checked: boolean[][];
		rowIsFinished: boolean;
	}
> {
	constructor(props: any) {
		super(props);
		let count: Record<
			string,
			{ total: number; inArray: number; correctPlace: number }
		> = {};
		/* Creates a dictionary with each colour in so that if a colour is in the right place, 
		it is only shown as being in the right place for one of them, not both */
		for (let colour of Colours) {
			count[colour[0]] = { total: 0, inArray: 0, correctPlace: 0 };
		}
		// Global, modifiable properties
		this.state = {
			active: props.active,
			// Creates an empty array for the colours to be added to when the user submits them
			colours: Array(4).fill(undefined),
			count: count,
			checked: [],
			rowIsFinished: false
		};
	}
	componentWillReceiveProps(nextProps: any, nextContext: any): void {
		this.setState({ active: nextProps.active });
	}
	render() {
		return (
			<>
				{/* the grid for the row */}
				<div className="grid">
					{/* the grid for guess entry */}
					<div className="grid">
						{this.state.colours.map((_, v) => {
							return (
								<Circle
									type="colour"
									active={this.state.active}
									id={v}
									// Passing through the method to set the colour to the Circle class
									setColour={this.setColour}
									// Passing through this method so that the right colours will be used according to user selected difficulty
									getColours={this.props.getColours}
								/>
							);
						})}
					</div>
					{/* the grid for guess validation */}

					{this.state.active ? (
						// The actual button the submit your guesses
						<button
							className="submit"
							onClick={this.state.rowIsFinished ? this.submitRow : () => null}
							style={{
								cursor: this.state.rowIsFinished ? "pointer" : "no-drop",
								color: this.state.rowIsFinished ? "white" : "#fff7"
							}}
						>
							Submit
						</button>
					) : (
						<div className="grid">
							{this.state.colours.map((_, v) => {
								return (
									<Circle
										type="guess"
										active={this.state.active}
										id={v}
										// Passing through the method to check the colour to the Circle class (for the guess confirmation.)
										checkColour={this.checkColour}
									/>
								);
							})}
						</div>
					)}
				</div>{" "}
			</>
		);
	}
	submitRow = () => {
		// Set this row to inactive
		this.setState({ active: false });
		// this array contains one element for each guess, and its contents are []
		let guesses = Array(4);
		// the count variable so that the same colour in the sequence is only accounted for once.
		let count = this.state.count;
		// gets the counts in the sequence for each colour
		for (let colour of this.props.sequence) {
			//@ts-ignore
			count[colour[0]].total++;
		}
		// gets the guesses that are correct in both colour and position
		for (let i in this.state.colours) {
			//@ts-ignore
			let guess: Colour = this.state.colours[i];
			if (guess[0] === this.props.sequence[i][0]) {
				count[guess[0]].correctPlace++;
				guesses[i] = [true];
			} else {
				guesses[i] = [false];
			}
		}
		// gets the guesses that are correct in only colour not position.
		for (let i in this.state.colours) {
			//@ts-ignore
			let guess: Colour = this.state.colours[i];
			let cColour = count[guess[0]];
			let total = cColour.correctPlace + cColour.inArray;
			for (let j of this.props.sequence) {
				if (j[0] === guess[0]) {
					if (total < cColour.total) {
						guesses[i].push(true);
						count[guess[0]].inArray++;
						total++;
					}
				}
			}
			if (guesses[i].length < 2) {
				guesses[i].push(false);
			}
		}
		// update the state so the checkColour method will work
		this.setState({ checked: guesses });
		let won = true;
		for (let guess of guesses) {
			if (guess[0] === false) {
				won = false;
				break;
			}
		}
		this.props.submitRow(this.props.id, won);
	};
	// Sets the specific circle to a specific colour.
	setColour = (colour: Colour, circle: number) => {
		let arr = this.state.colours;
		arr[circle] = colour;
		this.setState({
			colours: arr
		});
		let rowIsFinished = true;
		for (let circle of arr) {
			if (circle === undefined) {
				rowIsFinished = false;
				break;
			}
		}
		if (rowIsFinished) {
			this.setState({ rowIsFinished });
		}
	};
	// Check if the colour is in the sequence and in the right place.
	checkColour = (circle: number): boolean[] => {
		return this.state.checked[circle] ?? [false, false];
	};
}

export default Row;
