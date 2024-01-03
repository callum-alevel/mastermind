//The class for the individual circles in each row of mastermind

import React from "react";
import Colours from "../types/Colour";

class Circle extends React.Component<
	//typings
	{
		type: "colour" | "guess";
		active: boolean;
		id: number;
		setColour?: Function;
		checkColour?: Function;
	},
	{ showMenu: boolean; colour?: string; active: boolean }
> {
	constructor(props: any) {
		super(props);
		// Global, modifiable properties
		this.state = {
			active: this.props.active,
			showMenu: false
		};
	}
	/* Upon the values passed through via the parent class changing, 
	they are changed in this class as well */
	componentWillReceiveProps(
		nextProps: Readonly<{
			type: "colour" | "guess";
			active: boolean;
			id: number;
			setColour?: Function | undefined;
			checkColour?: Function | undefined;
		}>,
		nextContext: any
	): void {
		this.setState({ active: nextProps.active });
	}
	render() {
		// This checks if the colour is correct
		let checked;
		if (this.props.type === "guess" && !this.state.active) {
			// Calls the method from the parent (the row) to check if the colour is right
			//@ts-ignore
			checked = this.props.checkColour(this.props.id);
		}
		return (
			<div>
				<div
					// Sets the type of circle for the correct styling
					className={`circle ${this.props.type}`}
					/* Checks if it is the type of circle to guess the colour, and if it is,
					when you click the circle, it shows the menu to select a colour */
					onClick={
						this.props.type === "colour" && this.state.active
							? this.showMenu
							: () => null
					}
					/* This code will:
						- if the user has selected a colour, change the colour of the circle to that colour
						- if the user submits the row, it changes the colours of the confirmation circles to 
						white, red or blank depending on if it is correct and positioning
					*/
					style={
						this.state.colour
							? {
									backgroundColor: this.state.colour,
									border: "3px solid " + this.state.colour
							  }
							: checked
							? {
									// Red is correct colour wrong place, white is correct colour correct place
									//@ts-ignore
									backgroundColor: checked[0] ? "white" : checked[1] ? "red" : "inherit",
									border:
										"3px solid " + (checked[0] ? "white" : checked[1] ? "red" : "gray")
							  }
							: {}
					}
				/>
				{this.state.showMenu ? (
					<div className="grid dropdown">
						{
							// Creates the dropdown menu of the options for colours
							Colours.map(([colour, hex]) => {
								return this.state.active ? (
									<div
										className="circle guess picker"
										style={{
											// styles the circle with the specific colour
											border: "3px solid" + hex,
											color: hex,
											marginBottom: "2px",
											backgroundColor: hex
										}}
										// Sets the colour when pressed
										onClick={() => this.setColour([colour, hex])}
									/>
								) : (
									<></>
								);
							})
						}
					</div>
				) : (
					""
				)}
			</div>
		);
	}
	// Sets the colour by calling the function from the parent (the row)
	setColour = (colour: string[]) => {
		//@ts-ignore
		this.props.setColour(colour, this.props.id);
		this.setState({ colour: colour[1] });
	};
	// Defines whether or not the menu is shown
	showMenu = () => {
		this.setState({
			showMenu: !this.state.showMenu
		});
	};
}

export default Circle;
