import React, { Component } from "react";
import Style from "./componentStyle/TabSelect.module.css";
class TabSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: 0,
			canScroll: true,
		};
		this.tabUl = React.createRef();
	}
	/**
	 *
	 * @param {Number} index
	 * @param {Object} item
	 * @description 点击tab 触发响应页面滚动。
	 */
	handleClickTab(index, item) {
		this.setState({
			active: index,
		});
		this.setState({ canScroll: false });
		window.scrollTo(0, item.scrollTop);
		setTimeout(() => {
			this.setState({ canScroll: true });
		}, 0);
	}
	/**
	 *
	 * @param {Number} index
	 * @description 父组件调用该方法。
	 */
	tabItemShow(index) {
		const { canScroll } = this.state;
		if (canScroll) {
			this.tabUl.current.childNodes[index].scrollIntoView();
			this.setState({
				active: index,
			});
		}
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
					<ul ref={this.tabUl} className={Style.tabSelect}>
						{tabItem}
					</ul>
				</div>
			</div>
		);
	}
}

export default TabSelect;
