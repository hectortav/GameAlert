import React, { Component } from "react";
import "./Slider.css";

const defaultValue = 50;

class MySlider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			min: 0,
			max: 100,
			value: defaultValue,
			id: "myRange"
		};
	}

	handleChange = event => {
		this.setState({ value: event.target.value });
	};

	render() {
		return (
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
			</div>
		);
	}
}

export default MySlider;
