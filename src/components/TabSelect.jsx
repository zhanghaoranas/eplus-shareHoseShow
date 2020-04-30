import React, { Component } from "react";
import Style from "./componentStyle/TabSelect.module.css";
class TabSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: 0,
		};
	}
	handleClickTab(index) {
		this.setState({
			active: index,
		});
		console.log(index);
	}
	render() {
		const { active } = this.state;
		const tabItem = this.props.labList.map((label, index) => (
			<li
				className={index === active ? Style.activeTabItem : undefined}
				onClick={() => this.handleClickTab(index)}
				key={index}
			>
				{label}
			</li>
		));
		return (
			<div className={Style.tabSelect_warp}>
				<ul className={Style.tabSelect}>{tabItem}</ul>
			</div>
		);
	}
}

export default TabSelect;
