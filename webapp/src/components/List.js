import React, { Component } from "react";
import axios from "axios";
import Img from "react-image";

class GetList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			posts: [],
			output: [],
			pref_price: props.pref_price,
			pref_percent: props.pref_percent,
			image_height: 150,
			image_width: 150
		};
	}

	componentDidMount() {
		axios
			.get(
				"https://www.reddit.com/r/GameDeals/search.json?q=gamedeals&sort=hot"
			)
			.then(response => {
				console.log(response);
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
		const { posts, pref_percent, pref_price } = this.state;

		if (!posts) return;

		const output = posts.map(post => {
			post = post.data;
			var flag_percent = false;
			var flag_price = false;
			var str = post.title;
			var price = str.match(
				/((€|\$|£)(\s*)([0-9]+)(.|,|')([0-9]+))|(([0-9]+)(.|,|')([0-9]+)(\s*)(€|\$|£))/g
			);
			var percent = str.match(/(([0-9]+)(\s*)(%))|((%)(\s*)([0-9]+))/g);
			if (percent) {
				for (var i = 0; i < percent.length; i++) {
					//percent[i].replace(/(\,)/g, '.');
					percent[i] = percent[i].match(/(([0-9]+)(.|,|')([0-9]*))|([0-9]+)/g);
					if (percent[i] >= pref_percent) flag_percent = true;
				}
			}
			if (price) {
				for (i = 0; i < price.length; i++) {
					//price[i].replace(/(\,)/g, '.');
					price[i] = price[i].match(/(([0-9]+)(.|,|')([0-9]*))|([0-9]+)/g);
					if (price[i] <= pref_price) flag_price = true;
				}
			}

			if (str.indexOf("free") > -1 || flag_price || flag_percent) {
				i = 1;
				var platform = "";
				if (str.charAt(0) === "[") {
					while (str.charAt(i) !== "]" && i < str.length) {
						platform += str.charAt(i);
						i++;
					}
					i++;
				}
				if (!post.url || post.url.includes("www.reddit.com")) return null;
				return {
					key: post.id,
					info: post.url,
					pic: post.thumbnail,
					platform: platform,
					price: price,
					percent: percent
				};
			}
			return null;
		});
		console.log(output);
		this.setState({
			output: output
		});
	}

	render() {
		const { output } = this.state;
		return (
			<div>
				{output.length
					? output.map(out =>
							out ? (
								<div key={out.key}>
									<h1>[{out.platform ? out.platform : "Unknown"}]</h1>
									{out.info}
									{out.pic ? (
										<Img
											src={[out.pic, require("../props/default_image.png")]}
											height={this.state.image_height}
											width={this.state.image_width}
										/>
									) : null}
								</div>
							) : null
					  )
					: null}
			</div>
		);
	}
}

export default GetList;
