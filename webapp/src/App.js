import React, { Component } from "react";
import "./App.css";
import GetList from "./components/List";
import Prefs from "./components/Prefs";
import ls from "local-storage";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		const percentage = ls.get("percentage") || 50;
		const price = ls.get("price") || 10;
		return (
			<div className="App">
				{0 ? (
					<Prefs />
				) : (
					<GetList pref_price={price} pref_percent={percentage} />
				)}
			</div>
		);
	}
}

export default App;
