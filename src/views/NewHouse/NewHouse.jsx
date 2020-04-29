import React, { Component } from "react";
import { Router } from "@reach/router";

import BusinessInfo from "./NewHouseInfo.jsx";
import MoreInfo from "./MoreInfo.jsx";

const Business = () => {
	return (
		<div>
			<Router>
				<BusinessInfo path="/" />
				<MoreInfo path="info" />
			</Router>
		</div>
	);
};

export default Business;
