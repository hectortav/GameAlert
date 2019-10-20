import React, { Component } from "react";
import axios from "axios";

class GetList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			posts: [],
			output: []
		};
	}

	componentDidMount() {
		axios
			.get(
				"https://www.reddit.com/r/GameDeals/search.json?q=gamedeals&sort=hot"
			)
			.then(response => {
				this.setState({
					posts: response.data.data.children
				});
				this.getGames();
			})
			.catch(error => {
				console.log(error);
			});
	}

	getGames() {
		const { posts } = this.state;

		if (!posts) return;

		const output = posts.map(post => {
			post = post.data;
			var pref_persent = 100;
			var pref_price = 10;
			var flag_persent = false;
			var flag_price = false;
			var str = post.title;
			var price = str.match(
				/((€|\$|£)(\s*)([0-9]+)(.|,|')([0-9]+))|(([0-9]+)(.|,|')([0-9]+)(\s*)(€|\$|£))/g
			);
			var persent = str.match(/(([0-9]+)(\s*)(%))|((%)(\s*)([0-9]+))/g);
			if (persent) {
				for (var i = 0; i < persent.length; i++) {
					//persent[i].replace(/(\,)/g, '.');
					persent[i] = persent[i].match(/(([0-9]+)(.|,|')([0-9]*))|([0-9]+)/g);
					if (persent[i] >= pref_persent) flag_persent = true;
				}
			}
			if (price) {
				for (i = 0; i < price.length; i++) {
					//price[i].replace(/(\,)/g, '.');
					price[i] = price[i].match(/(([0-9]+)(.|,|')([0-9]*))|([0-9]+)/g);
					if (price[i] <= pref_price) flag_price = true;
				}
			}

			/*if (str.indexOf("free") > -1 ||str.indexOf("100%") > -1 || str.indexOf("€0.00") > -1
                    || str.indexOf("£0.00") > -1 || str.indexOf("$0.00") > -1 || str.indexOf("0.00€") > -1
                    || str.indexOf("0.00£") > -1 || str.indexOf("0.00$") > -1)*/
			if (str.indexOf("free") > -1 || flag_price || flag_persent) {
				i = 1;
				var platform = "";
				if (str.charAt(0) === "[") {
					while (str.charAt(i) !== "]" && i < str.length) {
						platform += str.charAt(i);
						i++;
					}
					i++;
				}
				return { key: post.id, info: post.url };
			}
			return null;
		});
		console.log(output);
		this.setState({
			output: output
		});
	}

	render() {
		const { posts, output } = this.state;
		return (
			<div>
				List of Posts
				{/*<div>{posts.length}</div>*/}
				{/*posts.length
					? posts.map(post => <div key={post.data.id}>{post.data.title}</div>)
                : null*/}
				{output.length
					? output.map(out =>
							out ? <div key={out.key}>{out.info}</div> : null
					  )
					: null}
			</div>
		);
	}
}

export default GetList;
