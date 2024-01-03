// The class for the entire board of mastermind

import React from "react";
import Colours, { Colour } from "../types/Colour";
import Row from "./Row";
const NumberOfRows = 6;

class Board extends React.Component<
	//typings
	{},
	{ sequence: Colour[]; rows: boolean[]; won: boolean; currentRow: number }
> {
	constructor(props: any) {
		super(props);
		// Global, modifiable properties
		this.state = {
			sequence: this.generateSequence(),
			// This states whether or not the row is active
			rows: Array(NumberOfRows).fill(false),
			won: false,
			// Incramented on each submission of a row
			currentRow: 0
		};
		// Marks the first row as active
		this.state.rows[0] = true;
	}

	// Generates the random sequence of colours.
	generateSequence(): Colour[] {
		let sequence: Colour[] = [];
		for (let i = 0; i < 4; i++) {
			sequence.push(Colours[Math.floor(Math.random() * Colours.length)]);
		}
		return sequence;
	}

	render() {
		return (
			<>
				{
					// This is only to be rendered in the case that the game is won
					this.state.won ? (
						<>
							<h1 className="title">You win!</h1>
							<a href="/">
								<i className="fas fa-redo-alt" /> Press here to play again
							</a>
						</>
					) : (
						""
					)
				}
				{
					/* This is only to be rendered in the case that the game is lost
					This condition states "if the game is not won and the current row is one beyond
					the number of rows (including 0 as the first row)""*/
					!this.state.won && this.state.currentRow === this.state.rows.length ? (
						<>
							<h1 className="title">You lost!</h1>
							The solution was:
							<div className="grid">
								{this.state.sequence.map((c) => (
									<div
										className="circle colour"
										style={{ border: "5px solid " + c[1], backgroundColor: c[1] }}
									/>
								))}
							</div>
							<a href="/">
								<i className="fas fa-redo-alt" /> Press here to play again
							</a>
						</>
					) : (
						""
					)
				}
				{this.state.rows.map((_, i) => {
					return (
						<>
							{/* Initialises 6 rows, giving each one its unique identifier, the sequence
							to comapre to, whether or not it is active, and passes through the submitRow 
							method so the row is able to be submitted and move on to the next */}
							<Row
								active={this.state.rows[i]}
								sequence={this.state.sequence}
								id={i}
								submitRow={this.submitRow}
							/>
						</>
					);
				})}
			</>
		);
	}
	// The method allowing rows to be submitted
	submitRow = (id: number, won: boolean) => {
		let rows = this.state.rows;
		rows[id] = false; // Changes the row to inactive
		if (id !== this.state.rows.length - 1 && !won) {
			rows[id + 1] = true; // Makes sure the next row is active IF the game is not won or lost
		}
		// Pushes these changes to the overall class
		this.setState({ rows, won, currentRow: id + 1 });
	};
}

export default Board;
