import React, { Component } from "react";

export default class Business extends Component {
	constructor(props) {
		super(props);
		this.state = props.location.state;
	}
	componentDidMount() {}
	render() {
		return <h1>买卖房源</h1>;
	}
}
