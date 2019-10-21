import React, { Component } from "react";
import Slider from "./Slider";

class Prefs extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sliderOptions: [
				{
					key: "price",
					min: 0,
					max: 60,
					minLabel: "Free",
					maxLabel: 60,
					value: 10,
					delimiter: ""
				},
				{
					key: "percentage",
					min: 0,
					max: 100,
					minLabel: 0,
					maxLabel: "Free",
					value: 50,
					delimiter: "%"
				}
			]
		};
	}

	handleChange = target => {
		const sliderOptions = [...this.state.sliderOptions];
		const index = sliderOptions
			.map(function(x) {
				return x.key;
			})
			.indexOf(target.id);
		sliderOptions[index].value = target.value;
		this.setState({ sliderOptions });
	};

	render() {
		return (
			<div>
				{this.state.sliderOptions.map(slider => (
					<Slider
						key={slider.key}
						id={slider.key}
						min={slider.min}
						max={slider.max}
						maxLabel={slider.maxLabel}
						minLabel={slider.minLabel}
						delimiter={slider.delimiter}
						onValueChange={this.handleChange}
						defaultValue={slider.value}
						value={slider.value}
					/>
				))}
				<h1>{this.state.sliderOptions[0].value}</h1>
				<h1>{this.state.sliderOptions[1].value}</h1>
			</div>
		);
	}
}

export default Prefs;
