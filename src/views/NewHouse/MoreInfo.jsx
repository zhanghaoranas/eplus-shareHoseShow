import React, { Component } from "react";
import NavBar from "../../components/NavBar.jsx";
import TabSelect from "../../components/TabSelect.jsx";
import { formatTime } from "../../utils";
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
					label: "基础情况",
					id: "baseInfo",
					scrollTop: 0
				},
				{
					label: "生活信息",
					id: "lifeInfo",
					scrollTop: 0
				},
				{
					label: "建筑信息",
					id: "buildInfo",
					scrollTop: 0
				}
			]
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
		const paddingTop = document.querySelector("#baseInfo").offsetTop;
		labList.forEach(item => {
			const curElement = document.querySelector(`#${item.id}`);
			item.scrollTop = curElement.offsetTop - paddingTop;
		});
		window.addEventListener("scroll", this.handleScroll);
	}
	handleScroll() {
		// 顺序不能乱
		const { labList } = this.state;
		const index = labList.filter(
			item =>
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
					<li id="baseInfo">
						<h3>基础情况</h3>
						<ul className={Style.item}>
							<li>
								<span>交房时间</span>
								<span>{formatTime(fyInfo.joinDate) || "未知"}</span>
							</li>
							<li>
								<span>产权年限</span>
								<span>{fyInfo.cqYear || "未知"}</span>
							</li>
							<li>
								<span>户型结构</span>
								<span>{fyInfo.huxingjiegou || "未知"}</span>
							</li>
							<li>
								<span>装修标准</span>
								<span>{fyInfo.zhuangxiu || "未知"}</span>
							</li>
							<li>
								<span>落户情况</span>
								<span>{fyInfo.luohu || "未知"}</span>
							</li>
							<li>
								<span>学区情况</span>
								<span>{fyInfo.xuequ || "未知"}</span>
							</li>
							<li>
								<span>配套情况</span>
								<span>{fyInfo.peitao || "未知"}</span>
							</li>
							<li>
								<span>售楼地址</span>
								<span>{fyInfo.sellAddress || "未知"}</span>
							</li>
							<li>
								<span>五证情况</span>
								<span>{fyInfo.fiveCredentials || "未知"}</span>
							</li>
						</ul>
					</li>
					<li id="lifeInfo">
						<h3>生活信息</h3>
						<ul className={Style.item}>
							<li>
								<span>供暖方式</span>
								<span>{fyInfo.heatingWay || ""}</span>
							</li>
							<li>
								<span>用电类型</span>
								<span>{fyInfo.electricType || ""}</span>
							</li>
							<li>
								<span>用水类型</span>
								<span>{fyInfo.waterType || ""}</span>
							</li>
							<li>
								<span>车位配比</span>
								<span>{fyInfo.parking || ""}</span>
							</li>
							<li>
								<span>燃气情况</span>
								<span>{fyInfo.gas || ""}</span>
							</li>
							<li>
								<span>热水情况</span>
								<span>{fyInfo.hotWater || ""}</span>
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
								<span>
									{fyInfo.zuodong
										? fyInfo.zuodong + "栋"
										: ""}
								</span>
							</li>
							<li>
								<span>总户数</span>
								<span>
									{fyInfo.huTotal
										? fyInfo.huTotal + "户"
										: ""}
								</span>
							</li>
							<li>
								<span>建筑类型</span>
								<span>{fyInfo.buildType || ""}</span>
							</li>
							<li>
								<span>建筑结构</span>
								<span>{fyInfo.buildStructure || ""}</span>
							</li>
							<li>
								<span>建筑年代</span>
								<span>
									{fyInfo.buildYear
										? formatTime(fyInfo.buildYear, "{y}") + "年"
										: ""}
								</span>
							</li>
							<li>
								<span>绿化率</span>
								<span>{fyInfo.greenPercent || ""}</span>
							</li>
							<li>
								<span>容积率</span>
								<span>{fyInfo.plotRatio || ""}</span>
							</li>
							<li>
								<span>占地面积</span>
								<span>
									{fyInfo.area ? fyInfo.area + "㎡" : ""}
								</span>
							</li>
							<li>
								<span>开发商</span>
								<span>{fyInfo.developer || ""}</span>
							</li>
							<li>
								<span>物业公司</span>
								<span>{fyInfo.propertyCompany || ""}</span>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		);
	}
}
