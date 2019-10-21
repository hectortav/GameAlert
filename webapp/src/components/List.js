import React, { Component } from "react";
import axios from "axios";
import Img from "react-image";
import "bootstrap/dist/css/bootstrap.min.css";

class GetList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			posts: [],
			output: [],
			pref_price: props.pref_price,
			pref_percent: props.pref_percent,
			maxlimit: 200
		};
	}

	componentDidMount() {
		axios
			.get(
				"https://www.reddit.com/r/GameDeals/search.json?q=gamedeals&sort=hot"
			)
			.then(response => {
				//console.log(response);
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
				const title = platform
					? post.title.replace("[" + platform + "]", "")
					: post.title;
				return {
					title: title,
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
		//console.log(output);
		this.setState({
			output: output
		});
	}

	render() {
		const { output } = this.state;
		return (
			<div className="list-group">
				{output.length
					? output.map(out =>
							out ? (
								<a
									href={out.info}
									className="list-group-item list-group-item-action"
								>
									{" "}
									<div
										key={out.key}
										className="d-flex w-100 justify-content-between"
									>
										<h5
											className="mb-1"
											top="0"
											left="0%"
											right="10%"
											width="90%"
										>
											{out.title.length > this.state.maxlimit
												? out.title.substring(0, this.state.maxlimit - 3) +
												  "..."
												: out.title}
										</h5>
										<small bottom="0" left="0%" right="90%">
											{out.platform ? "[" + out.platform + "]" : ""}
										</small>
										<div
											position="absolute"
											right="0%"
											left="90%"
											padding="10"
											width="10%"
										>
											{out.pic ? (
												<Img
													bottom="0%"
													top="10%"
													height="90%"
													className="rounded float-left"
													src={
														[
															out.pic,
															""
														] /*require("../props/default_image.png")*/
													}
												/>
											) : null}
										</div>
										{/*<small>Donec id elit non mi porta.</small>*/}
									</div>
								</a>
							) : null
					  )
					: null}
			</div>
		);
	}
}

export default GetList;
