import React, { Component } from "react";

import NavBar from "../../components/NavBar.jsx";
import loadMap from "../../utils/importBMap.js";
import { mapKey } from "../../config.js";
import Style from "./map.module.css";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"


let toastify;
class Map extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchActive: 0,
			searchData: [
				{
					type: "地铁",
					icon: "#iconditie1",
				},
				{
					type: "公交",
					icon: "#icongongjiao",
				},
				{
					type: "银行",
					icon: "#iconyinhang1",
				},
				{
					type: "学校",
					icon: "#iconxuexiao",
				},
				{
					type: "医院",
					icon: "#iconyaoxiang",
				},
				{
					type: "购物",
					icon: "#icongouwu1",
				},
			],
		};
		//除了 setState 和 props 以外的任何东西都不会触发二次渲染
		this.map = null;
	}
	componentDidMount() {
		this.loadMap();
	}
	/**
	 * @description 加载地图
	 */
	loadMap() {
		loadMap(mapKey).then((res) => {
			this.initMap();
		});
	}
	/**
	 * @description 初始化地图
	 */
	initMap() {
		const { longitude, latitude } = this.props.location.state;
		const map = (this.map = new BMap.Map("map", {
			enableMapClick: false,
		}));
		const point = new BMap.Point(longitude, latitude); // 小区的坐标。
		map.centerAndZoom(point, 16);
		const marker = new BMap.Marker(point); // 创建标注
		map.addOverlay(marker);
		this.handleClickSearch(this.state.searchData[0].type);
	}
	handleClickSearch(type, index = 0) {
		if (toastify) {
			toastify.hideToast();
		}
		this.setState({
			searchActive: index,
		});
		this.map.clearOverlays();
		const { longitude, latitude } = this.props.location.state;
		const point = new BMap.Point(longitude, latitude);
		const marker = new BMap.Marker(point); // 创建标注
		this.map.addOverlay(marker);

		const mapSearch = new BMap.LocalSearch(this.map, {
			renderOptions: {
				map: this.map,
				autoViewport: false,
				selectFirstResult: false,
			},
			onMarkersSet: function (pois) {
				if (pois.length === 0) {
					toastify = Toastify({
						text: `该小区周边暂时没有${type}数据`,
						duration: 1000,
						position: 'center', // `left`, `center` or `right`
						className: 'custom_toast'
					}).showToast();
				}
			}
		});
		mapSearch.searchNearby(type, point, 1000);
	}
	render() {
		const { searchData, searchActive } = this.state;
		const searchTypeList = searchData.map((item, index) => (
			<li
				className={index === searchActive ? Style.search_active : ""}
				key={index}
				onClick={() => this.handleClickSearch(item.type, index)}
			>
				<svg className="icon" aria-hidden="true">
					<use xlinkHref={item.icon}></use>
				</svg>
				<span>{item.type}</span>
			</li>
		));
		return (
			<div className={Style.map_page}>
				<NavBar title="周边信息"></NavBar>
				<div className={Style.map_warp}>
					<div id="map"></div>
					<ul className={Style.bottom_choose}>{searchTypeList}</ul>
				</div>
			</div>
		);
	}
}
export default Map;
