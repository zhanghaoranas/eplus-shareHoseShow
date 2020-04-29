import React, { Component } from "react";
import NavBar from "../../components/NavBar.jsx";
export default class MoreInfo extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const fyInfo = this.props.location.state;
		console.log(fyInfo);
		return (
			<div>
				<NavBar title="房源信息"></NavBar>
				<ul>
					<li>房源信息</li>
					<li>交易信息</li>
					<li>业主信息</li>
					<li>特色信息</li>
					<li>生活信息</li>
					<li>建筑信息</li>
				</ul>
				<ul>
					<li>
						<h3>房源信息</h3>
						<ul>
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
								<span>{fyInfo.towards || ""}</span>
							</li>
							<li>
								<span>来源渠道</span>
								<span>{fyInfo.source || ""}</span>
							</li>
							<li>
								<span>套内面积</span>
								<span>
									{fyInfo.innerArea
										? fyInfo.innerArea + "m²"
										: ""}
								</span>
							</li>
							<li>
								<span>梯户</span>
								<span>
									{fyInfo.ti ? fyInfo.ti + "梯" : ""}
									{fyInfo.hu ? fyInfo.hu + "户" : ""}
								</span>
							</li>
							<li>
								<span>户型结构</span>
								<span>{fyInfo.huxingjiegou || ""}</span>
							</li>
							<li>
								<span>房屋现状</span>
								<span>{fyInfo.fangwuStatus || ""}</span>
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
								<span>钥匙</span>
								<span>{fyInfo.ifKey ? "有" : "无"}</span>
							</li>
							<li>
								<span>钥匙存放地</span>
								<span>{fyInfo.keyplaceName || ""}</span>
							</li>
						</ul>
					</li>
					<li>
						<h3>交易信息</h3>
						<ul>
							<li>
								<span>交易权属</span>
								<span>{fyInfo.jyBelong || ""}</span>
							</li>
							<li>
								<span>出证日期</span>
								<span>
									{fyInfo.chuzhengDate &&
										fyInfo.chuzhengDate + "年"}
								</span>
							</li>
							<li>
								<span>产权年限</span>
								<span>{fyInfo.cqYear || ""}</span>
							</li>
							<li>
								<span>产权所属</span>
								<span>{fyInfo.cqBelong || ""}</span>
							</li>
							<li>
								<span>唯一住房</span>
								<span>
									{fyInfo.ifOnly == "0" ? "" : fyInfo.ifOnly}
								</span>
							</li>
							<li>
								<span>抵押信息</span>
								<span>{fyInfo.diya || ""}</span>
							</li>
							<li>
								<span>房产证</span>
								<span>{fyInfo.propertyCard || ""}</span>
							</li>
						</ul>
					</li>
					<li>
						<h3>业主信息</h3>
						<ul>
							<li>
								<span>联系人是否为业主</span>
								<span>{fyInfo.mmfyOwner.ifOwner || ""}</span>
							</li>
							<li>
								<span>婚姻状况</span>
								<span>{fyInfo.mmfyOwner.marriage || ""}</span>
							</li>
							<li>
								<span>户口情况</span>
								<span>{fyInfo.mmfyOwner.hukou || ""}</span>
							</li>
							<li>
								<span>期望出售周期</span>
								<span>{fyInfo.sellCycle || ""}</span>
							</li>
							<li>
								<span>售房原因</span>
								<span>{fyInfo.sellReason || ""}</span>
							</li>
						</ul>
					</li>
					<li>
						<h3>特色信息</h3>
						<ul>
							<li>
								<span>学区名额</span>
								<span>{fyInfo.xuequ || ""}</span>
							</li>
							<li>
								<span>房源配套</span>
								<span>{fyInfo.peitao || ""}</span>
							</li>
							<li>
								<span>装修</span>
								<span>{fyInfo.zhuangxiu || ""}</span>
							</li>
							<li>
								<span>税费解析</span>
								<span>{fyInfo.taxationJiexi || ""}</span>
							</li>
							<li>
								<span>核心卖点</span>
								<span>{fyInfo.hexinmaidian || ""}</span>
							</li>
							<li>
								<span>交通出行</span>
								<span>{fyInfo.traffic || ""}</span>
							</li>
							<li>
								<span>房源介绍</span>
								<span>{fyInfo.introduce || ""}</span>
							</li>
						</ul>
					</li>
					<li>
						<h3>生活信息</h3>
						<ul>
							<li>
								<span>供暖方式</span>
								<span>{fyInfo.heatWay || ""}</span>
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
								<span>{fyInfo.parkingRatio || ""}</span>
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
					<li>
						<h3>建筑信息</h3>
						<ul>
							<li>
								<span>座栋数</span>
								<span>{fyInfo.zuodongNum || ""}</span>
							</li>
							<li>
								<span>总户数</span>
								<span>
									{fyInfo.fangjianNum
										? fyInfo.fangjianNum + "户"
										: ""}
								</span>
							</li>
							<li>
								<span>建筑类型</span>
								<span>{fyInfo.buildType || ""}</span>
							</li>
							<li>
								<span>建筑结构</span>
								<span>{fyInfo.buildStruct || ""}</span>
							</li>
							<li>
								<span>建筑年代</span>
								<span>
									{fyInfo.buildYear
										? fyInfo.buildYear + "年"
										: ""}
								</span>
							</li>
							<li>
								<span>绿化率</span>
								<span>{fyInfo.greenRatio || ""}</span>
							</li>
							<li>
								<span>容积率</span>
								<span>{fyInfo.volumeRatio || ""}</span>
							</li>
							<li>
								<span>占地面积</span>
								<span>
									{fyInfo.allarea
										? fyInfo.allarea + "㎡"
										: ""}
								</span>
							</li>
							<li>
								<span>开发商</span>
								<span>{fyInfo.developer || ""}</span>
							</li>
							<li>
								<span>物业公司</span>
								<span>{fyInfo.property || ""}</span>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		);
	}
}
