import React, { Component } from "react";
import "./Slider.css";

const defaultValue = 50;

class MySlider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			min: 0,
			max: 100,
			minLabel: 0,
			maxLabel: "Free",
			value: defaultValue,
			id: "myRange"
		};
	}

	handleChange = event => {
		this.setState({ value: event.target.value });
	};

	render() {
		return (
			<div>
				<b>{this.state.value}</b>

				<div className="slidecontainer">
					<input
						type="range"
						min={this.state.min}
						max={this.state.max}
						value={this.state.value}
						className="slider"
						id={this.state.id}
						onChange={this.handleChange}
					/>
					<div
						style={{
							width: "100%",
							margin: "auto",
							flexDirection: "row",
							justifyContent: "space-between"
						}}
					>
						<b style={{ margin: "auto", padding: "0%" }}>
							{this.state.minLabel}
						</b>
						<b style={{ margin: "auto", padding: "90%" }}>
							{this.state.maxLabel}
						</b>
					</div>
				</div>
			</div>
		);
	}
}

export default MySlider;
