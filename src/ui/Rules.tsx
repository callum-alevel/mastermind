// The modal to show the rules of Mastermind (using bootstrap styling)

import React from "react";
import { Modal, Button } from "react-bootstrap";
import Colours from "../types/Colour";
const colours = Colours.slice(0, 4);
class Rules extends React.Component<
	{ show: boolean; setColours: Function },
	{ show: boolean; selected: boolean }
> {
	constructor(props: any) {
		super(props);
		this.state = {
			show: this.props.show,
			selected: false
		};
	}
	componentWillReceiveProps(nextProps: { show: boolean }) {
		this.setState(nextProps);
	}
	render() {
		return this.state.show ? (
			<Modal
				show={this.state.show}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header className="modal-styles">
					<Modal.Title id="contained-modal-title-vcenter">
						Welcome to Mastermind!
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="modal-styles">
					<h2>How to Play</h2>
					<h4>Guess the 4 colour sequence in 6 tries</h4>
					<p>
						{" "}
						- Each guess must contain 4 colours
						{!this.state.selected ? (
							<>
								<br />- At the bottom of this page, you have the option to select
								whether you'd like to have 6 or 8 colours to choose from per guess (6 is
								easier, 8 is harder)
							</>
						) : (
							""
						)}
						<br />- To begin, select your chosen colours on the first row and press
						submit
						<br />- Repeat until you guess correctly or have guessed 6 times
						<br />- The colours of the circles next to your guess will change to show
						how close you were to the correct sequence
					</p>
					<h3>Colour Definitions</h3>
					<p>
						<button
							style={{
								borderRadius: "50px",
								width: "20px",
								height: "20px",
								border: "3px solid white",
								background: "white",
								cursor: "default"
							}}
						/>{" "}
						Means the colour is correct and in the right place
						<br />
						<button
							style={{
								borderRadius: "50px",
								width: "20px",
								height: "20px",
								border: "3px solid red",
								background: "red",
								cursor: "default"
							}}
						/>{" "}
						Means the colour is correct but in the wrong place
						<br />
						<button
							style={{
								borderRadius: "50px",
								width: "20px",
								height: "20px",
								border: "3px solid #fff7",
								cursor: "default",
								background: "inherit"
							}}
						/>{" "}
						Means the colour is not in the sequence
					</p>
					<h3>Example</h3>
					{colours.map((c) => {
						return (
							<button
								style={{
									borderRadius: "50px",
									width: "40px",
									height: "40px",
									border: "5px solid " + c[1],
									background: c[1],
									cursor: "default",
									marginLeft: "0",
									marginRight: "5px"
								}}
							/>
						);
					})}
					<button
						style={{
							borderRadius: "50px",
							width: "20px",
							height: "20px",
							border: "3px solid white",
							background: "white",
							cursor: "default"
						}}
					/>{" "}
					<button
						style={{
							borderRadius: "50px",
							width: "20px",
							height: "20px",
							border: "3px solid red",
							background: "red",
							cursor: "default"
						}}
					/>{" "}
					<button
						style={{
							borderRadius: "50px",
							width: "20px",
							height: "20px",
							border: "3px solid #fff7",
							cursor: "default",
							background: "inherit"
						}}
					/>{" "}
					<button
						style={{
							borderRadius: "50px",
							width: "20px",
							height: "20px",
							border: "3px solid #fff7",
							cursor: "default",
							background: "inherit"
						}}
					/>{" "}
					<br />
					This would mean that:
					<br /> - Blue is in the sequence and in the right place
					<br /> - Red is in the sequence but in the wrong place
					<br /> - Green and Aqua are not in the sequence at all
				</Modal.Body>
				<Modal.Footer className="modal-styles">
					{!this.state.selected ? (
						<>
							<h3 style={{ textAlign: "left" }}>Select Difficulty:</h3>
							<Button
								onClick={() => {
									this.selectColour(6);
								}}
							>
								Easy (6 colours)
							</Button>
							<Button
								onClick={() => {
									this.selectColour(8);
								}}
							>
								Hard (8 colours)
							</Button>
						</>
					) : (
						<Button
							onClick={() => {
								this.close();
							}}
						>
							Close
						</Button>
					)}
				</Modal.Footer>
			</Modal>
		) : (
			<></>
		);
	}
	selectColour = (numberOfColours: 6 | 8) => {
		this.props.setColours(numberOfColours);
		this.setState({ selected: true, show: false });
	};
	close = () => {
		this.setState({ show: false });
	};
}

export default Rules;
