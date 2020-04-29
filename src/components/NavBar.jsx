import React, { Component } from "react";
import Style from "./componentStyle/navBar.module.css";
import { navigate } from "@reach/router";
class NavBar extends Component {
	constructor(props) {
		super(props);
	}

	handleBack() {
		if (this.props.handleBack) {
			// 自定义返回事件
		} else {
			navigate(-1);
		}
	}

	render() {
		return (
			<div className={Style.navBar}>
				<span onClick={() => this.handleBack()}>
					<svg className="icon" aria-hidden="true">
						<use xlinkHref="#icon-fanhui"></use>
					</svg>
				</span>
				<div>
					<span>{this.props.title}</span>
				</div>
				<span></span>
			</div>
		);
	}
}

export default NavBar;
