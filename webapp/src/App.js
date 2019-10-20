import React from "react";
import "./App.css";
import GetList from "./components/List";
import Prefs from "./components/Prefs";

function App() {
	return (
		<div className="App">
			{/*<GetList pref_price={10} pref_percent={100} />*/}
			<Prefs />
		</div>
	);
}

export default App;
