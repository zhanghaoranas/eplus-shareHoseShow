import React, { Component } from "react";

class Map extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className={Style.map_warp}>
				<div id="map"></div>
				<ul>
					<li>
						<svg className="icon" aria-hidden="true">
							<use xlinkHref="#icon-ditie1"></use>
						</svg>
						<span>地铁</span>
					</li>
					<li>
						<svg className="icon" aria-hidden="true">
							<use xlinkHref="#icon-gongjiao"></use>
						</svg>
						<span>公交</span>
					</li>
					<li>
						<svg className="icon" aria-hidden="true">
							<use xlinkHref="#icon-yinhang1"></use>
						</svg>
						<span>银行</span>
					</li>
					<li>
						<svg className="icon" aria-hidden="true">
							<use xlinkHref="#icon-xuexiao"></use>
						</svg>
						<span>学校</span>
					</li>
					<li>
						<svg className="icon" aria-hidden="true">
							<use xlinkHref="#icon-yaoxiang"></use>
						</svg>
						<span>医院</span>
					</li>
					<li>
						<svg className="icon" aria-hidden="true">
							<use xlinkHref="#icon-gouwu1"></use>
						</svg>
						<span>购物</span>
					</li>
				</ul>
			</div>
		);
	}
}
