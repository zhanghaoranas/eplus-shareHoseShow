import React, { Component } from "react";
import Style from "./componentStyle/navBar.module.css";
const NavBar = ({ title }) => (
	<div className={Style.navBar}>
		<svg className="icon" aria-hidden="true">
			<use xlinkHref="#icon-ditie1"></use>
		</svg>
		<div></div>
		<span></span>
	</div>
);
