import React, { Component } from "react";
import Slider from "./Slider";
import ls from "local-storage";

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
		ls.set(target.id, target.value);
	};

	componentDidMount = () => {
		const sliderOptions = [...this.state.sliderOptions];
		var index = sliderOptions
			.map(function(x) {
				return x.key;
			})
			.indexOf("price");
		sliderOptions[index].value = ls.get("price") || 10;
		index = sliderOptions
			.map(function(x) {
				return x.key;
			})
			.indexOf("percentage");
		sliderOptions[index].value = ls.get("percentage") || 50;
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
			</div>
		);
	}
}

export default Prefs;
