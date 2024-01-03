import React from "react";
import "./App.scss";
import Rules from "./ui/Rules";
import Board from "./ui/Board";

// The main App Class, which contains all of the GUI aspect
class App extends React.Component<{}, { show: boolean }> {
	constructor(props: any) {
		super(props);
		this.state = {
			show: true
		};
	}
	render() {
		if (!localStorage.getItem("currentGame")) {
			localStorage.setItem(
				"currentGame",
				JSON.stringify({ sequence: [], rows: [] })
			);
		}
		return (
			<>
				<div className="App">
					<h1 className="title">Mastermind</h1>
					<Rules show={this.state.show} />
					{/* Display the board */}
					<Board />
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
	showRules = () => {
		this.setState({
			show: true
		});
	};
}

export default App;
