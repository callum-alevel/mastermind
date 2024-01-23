import React from "react";
import "./App.scss";
import Rules from "./ui/Rules";
import Board from "./ui/Board";
import Colours, { Colour } from "./types/Colour";
// The main App Class, which contains all of the GUI aspect
class App extends React.Component<{}, { show: boolean; colours: Colour[] }> {
	constructor(props: any) {
		super(props);
		this.state = {
			show: true,
			colours: Colours
		};
	}
	render() {
		return (
			<>
				<div className="App">
					<h1 className="title">Mastermind</h1>
					<Rules show={this.state.show} setColours={this.setColours} />
					{/* Display the board, passing through the colours to be used based on the difficulty chosen by the user */}
					<Board colours={this.state.colours} />
					<button
						className="rules"
						onClick={() => {
							this.showRules();
						}}
					>
						<i className="fas fa-info-circle" /> How to Play
					</button>
				</div>
			</>
		);
	}
	// Allows for the difficulty to be selected
	setColours = (numberOfColours: number) => {
		this.setState({
			colours: Colours.slice(0, numberOfColours),
			show: false
		});
	};
	showRules = () => {
		this.setState({
			show: true
		});
	};
}

export default App;
