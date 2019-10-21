import React, { Component } from "react";
import "./App.css";
import GetList from "./components/List";
import Prefs from "./components/Prefs";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		const { price, percentage } = this.state;

		return (
			<div className="App">
				{<Prefs />}
				{<GetList pref_price={10} pref_percent={100} />}
			</div>
		);
	}
}

export default App;
