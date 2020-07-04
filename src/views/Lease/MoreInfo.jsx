import React, { Component } from "react";
import NavBar from "../../components/NavBar.jsx";
import TabSelect from "../../components/TabSelect.jsx";
import { formatTime } from "../../utils/index.js";
import Style from "./moreInfo.module.css";
export default class MoreInfo extends Component {
	constructor(props) {
		super(props);
		window.scrollTo(0, 0);
		this.tabSelect = React.createRef();
		this.handleScroll = this.handleScroll.bind(this);
		this.state = {
			labList: [
				{
					label: "房屋信息",
					id: "houseInfo",
					scrollTop: 0,
				},
				{
					label: "特色信息",
					id: "characteristicInfo",
					scrollTop: 0,
				},
				{
					label: "生活信息",
					id: "lifeInfo",
					scrollTop: 0,
				},
				{
					label: "建筑信息",
					id: "buildInfo",
					scrollTop: 0,
				},
			],
		};
	}
	componentDidMount() {
		this.setScrollTop();
	}
	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
	}
	setScrollTop() {
		const { labList } = this.state;
		const paddingTop = document.querySelector("#houseInfo").offsetTop;
		labList.forEach((item) => {
			const curElement = document.querySelector(`#${item.id}`);
			item.scrollTop = curElement.offsetTop - paddingTop;
		});
		window.addEventListener("scroll", this.handleScroll);
	}
	handleScroll() {
		// 顺序不能乱
		const { labList } = this.state;
		const index = labList.filter(
			(item) =>
				item.scrollTop < window.scrollY ||
				item.scrollTop === window.scrollY
		).length;
		if (index > 0) {
			this.tabSelect.current.tabItemShow(index - 1);
		}
	}
	render() {
		const fyInfo = this.props.location.state;
		const labList = this.state.labList;
		return (
			<div>
				<NavBar title="房源信息"></NavBar>
				<TabSelect labList={labList} ref={this.tabSelect}></TabSelect>
				<ul className={Style.type}>
					<li id="houseInfo">
						<h3>房屋信息</h3>
						<ul className={Style.item}>
							<li>
								<span>户型</span>
								<span>
									{fyInfo.shi}室{fyInfo.ting}厅{fyInfo.wei}卫
								</span>
							</li>
							<li>
								<span>建筑面积</span>
								<span>{fyInfo.buildArea}m²</span>
							</li>
							<li>
								<span>楼层</span>
								<span>
									{fyInfo.louceng || "未知"}/
									{fyInfo.loucengTop || "未知"}层
								</span>
							</li>
							<li>
								<span>朝向</span>
								<span>{fyInfo.towards || "暂无信息"}</span>
							</li>
							<li>
								<span>梯户</span>
								<span>
									{fyInfo.ti && fyInfo.hu ? fyInfo.ti + "梯" + fyInfo.hu + "户" : "暂无信息"}
								</span>
							</li>
							<li>
								<span>户型结构</span>
								<span>{fyInfo.huxingjiegou || "暂无信息"}</span>
							</li>
							<li>
								<span>房屋现状</span>
								<span>{fyInfo.fangwuStatus || "暂无信息"}</span>
							</li>
							<li>
								<span>看房时间</span>
								<span>
									{fyInfo.lookDate
										? fyInfo.ifKey
											? "随时看房"
											: fyInfo.lookDate
										: "提前预约"}
								</span>
							</li>
							<li>
								<span>租客要求</span>
								<span>{fyInfo.rentRequire || ''}</span>
							</li>
							<li>
								<span>出租类型</span>
								<span>{fyInfo.rentType}</span>
							</li>
							<li>
								<span>钥匙</span>
								<span>{fyInfo.ifKey ? "有" : "无"}</span>
							</li>
							{fyInfo.ifKey ? <li>
								<span>钥匙存放地</span>
								<span>{fyInfo.keyplaceName || "无存放信息"}</span>
							</li> : ''}
						</ul>
					</li>
					<li id="characteristicInfo">
						<h3>特色信息</h3>
						<ul className={Style.item}>
							<li>
								<span>房源配套</span>
								<span>{fyInfo.peitao ? JSON.parse(fyInfo.peitao).join() : "暂无信息"}</span>
							</li>
							<li>
								<span>装修</span>
								<span>{fyInfo.zhuangxiu || "暂无信息"}</span>
							</li>
							<li>
								<span>核心卖点</span>
								<span>{fyInfo.hexinmaidian || "暂无信息"}</span>
							</li>
							<li>
								<span>交通出行</span>
								<span>{fyInfo.traffic || "暂无信息"}</span>
							</li>
							<li>
								<span>房源介绍</span>
								<span>{fyInfo.introduce || "暂无信息"}</span>
							</li>
						</ul>
					</li>
					<li id="lifeInfo">
						<h3>生活信息</h3>
						<ul className={Style.item}>
							<li>
								<span>供暖方式</span>
								<span>{fyInfo.heatWay || "暂无信息"}</span>
							</li>
							<li>
								<span>用电类型</span>
								<span>{fyInfo.electricType || "暂无信息"}</span>
							</li>
							<li>
								<span>用水类型</span>
								<span>{fyInfo.waterType || "暂无信息"}</span>
							</li>
							<li>
								<span>车位配比</span>
								<span>{fyInfo.parkingRatio || "暂无信息"}</span>
							</li>

							<li>
								<span>热水情况</span>
								<span>
									{fyInfo.ifHotwater
										? "有"
										: fyInfo.ifHotwater == 0
											? "无"
											: ""}
								</span>
							</li>
							<li>
								<span>物业费</span>
								<span>
									{fyInfo.propertyFee
										? fyInfo.propertyFee + "元/平米/月"
										: ""}
								</span>
							</li>
						</ul>
					</li>
					<li id="buildInfo">
						<h3>建筑信息</h3>
						<ul className={Style.item}>
							<li>
								<span>座栋数</span>
								<span>{fyInfo.zuodongNum ? fyInfo.zuodongNum + '栋' : ""}</span>
							</li>
							<li>
								<span>总户数</span>
								<span>
									{fyInfo.fangjianNum
										? fyInfo.fangjianNum + "户"
										: "暂无信息"}
								</span>
							</li>
							<li>
								<span>建筑类型</span>
								<span>{fyInfo.buildType || "暂无信息"}</span>
							</li>
							<li>
								<span>建筑结构</span>
								<span>{fyInfo.buildStruct || "暂无信息"}</span>
							</li>
							<li>
								<span>建筑年代</span>
								<span>
									{fyInfo.buildYear
										? formatTime(fyInfo.buildYear, "{y}") + "年"
										: "暂无信息"}
								</span>
							</li>
							<li>
								<span>绿化率</span>
								<span>{fyInfo.greenRatio || "暂无信息"}</span>
							</li>
							<li>
								<span>容积率</span>
								<span>{fyInfo.volumeRatio || "暂无信息"}</span>
							</li>
							<li>
								<span>占地面积</span>
								<span>
									{fyInfo.allarea
										? fyInfo.allarea + "㎡"
										: "暂无信息"}
								</span>
							</li>
							<li>
								<span>开发商</span>
								<span>{fyInfo.developer || "暂无信息"}</span>
							</li>
							<li>
								<span>物业公司</span>
								<span>{fyInfo.property || "暂无信息"}</span>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		);
	}
}
