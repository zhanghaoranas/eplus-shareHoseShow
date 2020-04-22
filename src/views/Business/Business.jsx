import React, { Component } from "react";
import { baseUrl, baseImgUrl } from "../../config.js";
export default class Business extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...props.location.state,
			fyInfo: null,
			isLoading: true,
		};
	}
	componentDidMount() {
		this.getFyInfoById();
	}
	async getFyInfoById() {
		const url = baseUrl + `maimai/mmfy/share?id=${this.state.fyId}`;
		const headers = new Headers({
			CITY: this.state.city,
		});
		try {
			const { data } = await fetch(url, {
				method: "get",
				headers: headers,
			}).then((res) => {
				return res.json();
			});
			this.setState({
				fyInfo: data,
				isLoading: false,
			});
		} catch (error) {
			console.log(error);
		}
	}

	render() {
		const { fyInfo, isLoading } = this.state;

		if (isLoading) {
			return <div>数据请求中</div>;
		} else {
			return <div>{fyInfo.id}</div>;
		}
	}
}
