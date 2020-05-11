import React, { Component } from "react";
import { Router, navigate } from "@reach/router";
import queryString from "query-string";

import Business from "./views/Business/Business.jsx";
import Lease from "./views/Lease/Lease.jsx";
import NewHouse from "./views/NewHouse/NewHouse.jsx";
import Map from "./views/Map/Map.jsx";

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			fyId: "",
			city: "",
			type: "",
			shareUserInfo: {
				name: "",
				tel: "",
				image: "",
			},
		};
	}
	static getDerivedStateFromProps(nextProps, prevState) {
		const hrefSearch =
			window.location.search ||
			"?fyId=109&type=2&tel=15612270536&name=%E5%BC%A0%E6%B5%A9%E7%84%B6&city=shijiazhuang&image=";
		const parames = queryString.parse(hrefSearch);
		return {
			fyId: parames.fyId,
			city: parames.city,
			type: parames.type,
			shareUserInfo: {
				name: parames.name,
				tel: parames.tel,
				image: parames.image,
			},
		};
	}

	componentDidMount() {
		const { type } = this.state;

		switch (type) {
			case "0":
				navigate(`/business`, { state: this.state });
				break;
			case "1":
				navigate(`/lease`, { state: this.state });
				break;
			case "2":
				navigate(`/newHouse`, { state: this.state });
				break;
			default:
				break;
		}
	}

	render() {
		return (
			<Router>
				<Business path="/business/*" />
				<Lease path="/lease/*" />
				<NewHouse path="/newHouse/*" />
				<Map path="/map" />
			</Router>
		);
	}
}
