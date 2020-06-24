import React, { Component } from "react";
import { Router } from "@reach/router";

import NewHouseInfo from "./NewHouseInfo.jsx";
import MoreInfo from "./MoreInfo.jsx";

const NewHouse = () => {
	return (
		<div>
			<Router>
				<NewHouseInfo path="/" />
				<MoreInfo path="info" />
			</Router>
		</div>
	);
};

export default NewHouse;
