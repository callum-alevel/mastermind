// The modal to show the rules of Mastermind (using bootstrap styling)

import React from "react";
import { Modal, Button } from "react-bootstrap";
import Colours from "../types/Colour";
const colours = Colours.slice(0, 4);
class Rules extends React.Component<{ show: boolean }, { show: boolean }> {
	constructor(props: { show: boolean }) {
		super(props);
		this.state = {
			show: this.props.show
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
						- Each guess must contain 4 colours of the 8 available
						<br />- To begin, select your chosen colours on the first row, and press
						submit, and repeat until you guess correctly or have guessed 6 times
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
					<br /> - Blue is in the sequence, and in the right place
					<br /> - Red is in the sequence, but in the wrong place
					<br /> - Green and Cyan are not in the sequence at all
				</Modal.Body>
				<Modal.Footer className="modal-styles">
					<Button
						onClick={() => {
							this.close();
						}}
					>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		) : (
			<></>
		);
	}
	close = () => {
		this.setState({ show: false });
	};
}

export default Rules;
