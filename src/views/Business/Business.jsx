import React, { Component } from "react";
import Loading from "../../components/Loading.jsx";
import FySwiper from "../../components/FySwiper.jsx";
import Tag from "../../components/Tag.jsx";

import Style from "./business.module.css";
import { baseUrl, baseImgUrl } from "../../config.js";
import noImg from "../../static/images/dai.jpg";

export default class Business extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...props.location.state,
			fyInfo: null,
			fyImg: [
				{
					src: noImg,
				},
			],
			isLoading: true,
		};
	}
	componentDidMount() {
		this.getFyInfoById();
	}
	async getFyInfoById() {
		const url = baseUrl + `maimai/mmfy/share?id=${this.state.fyId}`;
		const headers = new Headers({
			CITY: this.state.city,
		});
		try {
			const { data } = await fetch(url, {
				method: "get",
				headers: headers,
			}).then((res) => {
				return res.json();
			});

			this.setState({
				fyInfo: data,
			});
			this.getFyImg();
		} catch (error) {
			console.log(error);
		}
	}

	async getFyImg() {
		// 1.获取图片路径，2. new Image 加载图片 3. 将加载成功的路径添加到 房源图片中
		const { images, imgHxt } = this.state.fyInfo;
		const mainImg = JSON.parse(images);
		const hxImg = JSON.parse(imgHxt);
		if (mainImg) {
			let fyImg;
			fyImg = mainImg
				.map((item) => item.list)
				.flat()
				.map((item) => baseImgUrl + item.url);
			if (hxImg) {
				fyImg.push(...hxImg.map((item) => baseImgUrl + item.url));
			}
			const allImg = await Promise.all(
				fyImg.map((src) => this.loadImg(src))
			);
			const effectiveImg = allImg.filter(
				(item) => item.status === "success"
			);
			this.setState({
				fyImg: effectiveImg,
				isLoading: false,
			});
		}
	}

	loadImg(src) {
		return new Promise((resolve, reject) => {
			const image = new Image();
			image.src = src;
			image.onload = () => resolve({ src: src, status: "success" });
			image.onerror = () => resolve({ src: src, status: "fail" });
		});
	}

	render() {
		const { fyInfo, isLoading, fyImg } = this.state;

		if (isLoading) {
			return <Loading type="spinningBubbles" color="#FA8072"></Loading>;
		} else {
			// 标签
			const tagList = [];
			const { ifImg, ifKey, ifOnly, ifMan, ifSubway, xuequ } = fyInfo;
			(ifImg && tagList.push("图片")) ||
				(ifKey && tagList.push("钥匙")) ||
				(ifOnly != "0" && ifOnly != "否" && tagList.push("唯一")) ||
				(ifMan && tagList.push(ifMan)) ||
				(ifSubway != "0" && tagList.push("地铁")) ||
				(xuequ && xuequ == "是" && tagList.push("学区"));
			const tagMap = tagList.map((item, index) => (
				<Tag key={index} text={item}></Tag>
			));

			// 特色

			const features = [];
			const { hexinmaidian, taxationJiexi, traffic, introduce } = fyInfo;
			(hexinmaidian &&
				features.push({ label: "核心卖点", value: hexinmaidian })) ||
				(taxationJiexi &&
					features.push({
						label: "税费解析",
						value: taxationJiexi,
					})) ||
				(traffic &&
					features.push({ label: "交通出行", value: traffic })) ||
				(introduce &&
					features.push({ label: "房源介绍", value: introduce }));

			return (
				<div>
					<FySwiper imgList={fyImg}></FySwiper>
					<section className={`${Style.session} ${Style.bgcolor}`}>
						<h2 className={Style.xqName}>{fyInfo.xqName}</h2>
						<div className={Style.tag_warp}>{tagMap}</div>
						<div className={Style.activeInfo}>
							<div>
								<span>{fyInfo.price}万元</span>
								<span>{fyInfo.danjia}元/㎡</span>
							</div>
							<div>
								<span>
									{fyInfo.shi}室{fyInfo.ting}厅{fyInfo.wei}卫
								</span>
								<span>
									{fyInfo.louceng}/{fyInfo.loucengTop}层
								</span>
							</div>
							<div>
								<span>{fyInfo.buildArea}㎡</span>
								<span>{fyInfo.towards}</span>
							</div>
						</div>
						<hr className={Style.session_hr} />
						<div className={Style.time_and_address}>
							<div>
								<span>发布</span>
								<p>{fyInfo.inputDate}</p>
							</div>
							<div>
								<span>地址</span>
								<p>
									{fyInfo.xzqName}-{fyInfo.districtName}-
									{fyInfo.xqAddress}
								</p>
							</div>
						</div>
					</section>
					{features.length && (
						<section
							className={`${Style.session} ${Style.bgcolor}`}
						>
							<h2>房源特色</h2>
							{features.map((item, index) => (
								<div key={index} className={Style.features}>
									<h3>{item.label}</h3>
									<p>{item.value}</p>
								</div>
							))}
						</section>
					)}
					<section className={`${Style.session} ${Style.bgcolor}`}>
						<h2>房源信息</h2>
						<ul>
							<li>
								<span>房源编号</span>
								<span>{fyInfo.code}</span>
							</li>
							<li>
								<span>看房时间</span>
								<span>
									{fyInfo.lookDate
										? fyInfo.lookDate
										: "随时看房"}
								</span>
							</li>
							<li>
								<span>装修</span>
								<span>{fyInfo.zhuangxiu || ""}</span>
							</li>
							<li>
								<span>取暖方式</span>
								<span>{fyInfo.heatWay || ""}</span>
							</li>
							<li>
								<span>学区名额</span>
								<span>{fyInfo.xuequ || ""}</span>
							</li>
							<li>
								<span>交易权属</span>
								<span>{fyInfo.jyBelong || ""}</span>
							</li>
							<li>
								<span>出证日期</span>
								<span>{fyInfo.chuzhengDate}</span>
							</li>
							<li>
								<span>产权年限</span>
								<span>{fyInfo.cqYear || ""}</span>
							</li>
						</ul>
						<div>更多房源信息</div>
					</section>
					<section>
						<h2>周边配套</h2>
						<div>
							<div id="map"></div>
							<ul>
								<li>
									<span></span>
									<span>地铁</span>
								</li>
								<li>
									<span></span>
									<span>公交</span>
								</li>
								<li>
									<span></span>
									<span>银行</span>
								</li>
								<li>
									<span></span>
									<span>学校</span>
								</li>
								<li>
									<span></span>
									<span>医院</span>
								</li>
								<li>
									<span></span>
									<span>购物</span>
								</li>
							</ul>
						</div>
					</section>
					<div>
						<div>
							<img src="" alt="分享人" />
							<span></span>
						</div>
						<div>
							<span></span>
							<span>电话咨询</span>
						</div>
					</div>
				</div>
			);
		}
	}
}
