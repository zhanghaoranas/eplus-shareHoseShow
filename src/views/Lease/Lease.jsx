
import React, { Component } from "react";
import { Router } from "@reach/router";

import LeaseInfo from "./LeaseInfo.jsx";
import MoreInfo from "./MoreInfo.jsx";

const Lease = () => {
	return (
		<div>
			<Router>
				<LeaseInfo path="/" />
				<MoreInfo path="info" />
			</Router>
		</div>
	);
};

export default Lease;
