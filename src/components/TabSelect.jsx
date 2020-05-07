import React, { Component } from "react";
import Style from "./componentStyle/TabSelect.module.css";
class TabSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: 0,
		};
	}
	handleClickTab(index, item) {
		this.setState({
			active: index,
		});
		window.scrollTo(0, item.scrollTop);
	}
	render() {
		const { active } = this.state;
		const tabItem = this.props.labList.map((item, index) => (
			<li
				className={index === active ? Style.activeTabItem : undefined}
				onClick={() => this.handleClickTab(index, item)}
				key={index}
			>
				{item.label}
			</li>
		));
		return (
			<div className={Style.fixed_placeholder}>
				<div className={Style.tabSelect_warp}>
					<ul className={Style.tabSelect}>{tabItem}</ul>
				</div>
			</div>
		);
	}
}

export default TabSelect;
