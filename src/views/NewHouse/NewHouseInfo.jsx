import React, { Component } from "react";
import Loading from "../../components/Loading.jsx";
import FySwiper from "../../components/FySwiper.jsx";
import Tag from "../../components/Tag.jsx";
import PhoneSwipe from "../../components/PhoneSwipe.jsx";
import TimeLine from '../../components/TimeLine'
import { navigate } from "@reach/router";
import Style from "./newHouse.module.css";
import { baseUrl, baseImgUrl, mapKey } from "../../config.js";
import { formatTime, getImgLimit } from "../../utils/index.js";
import noImg from "../../static/images/dai.jpg";
import loadMap from "../../utils/importBMap.js";
import userHead from "../../image/head.png";
export default class NewHouseInfo extends Component {
	constructor(props) {
		super(props);
		this.handleScroll = this.handleScroll.bind(this);
		this.imgClick = this.imgClick.bind(this);
		this.canScroll = true;
		this.phoneSwipe = React.createRef();
		this.state = {
			...props.location.state,
			fyInfo: null,
			hxInfo: [],
			fyImg: [
				{
					src: noImg
				}
			],
			tabSelect: [
				{
					name: "卖点",
					id: "sellPoint",
					scrollTop: 0
				},
				{
					name: "户型",
					id: "fyHx",
					scrollTop: 0
				},
				{
					name: "动态",
					id: "dynamic",
					scrollTop: 0
				},
				{
					name: "信息",
					id: "lpInfo",
					scrollTop: 0
				},
				{
					name: "配套",
					id: "aroundMap",
					scrollTop: 0
				}
			],
			tabSelectActive: 0,
			isLoading: true
		};
	}
	componentDidMount() {
		this.getFyInfoById();
		this.getHXListById();
	}
	async getFyInfoById() {
		const url = baseUrl + `xinfang/xffy/share?id=${this.state.fyId}`;
		const headers = new Headers({
			CITY: this.state.city
		});
		try {
			const { data } = await fetch(url, {
				method: "get",
				headers: headers
			}).then(res => {
				return res.json();
			});

			this.setState({
				fyInfo: data
			});
			this.getFyImg();
		} catch (error) {
			console.log(error);
		}
	}
	async getHXListById() {
		const url = baseUrl + `xinfang/xffyLayout/sharelist`;
		const headers = new Headers({
			CITY: this.state.city,
			"Content-Type": "application/json;charset=UTF-8"
		});
		try {
			const { data } = await fetch(url, {
				method: "post",
				body: JSON.stringify({
					fyId: +this.state.fyId
				}),
				headers: headers
			}).then(res => {
				return res.json();
			});
			this.setState({
				hxInfo: data
			});
		} catch (error) {
			console.log(error);
		}
	}
	async getFyImg() {
		// 1.获取图片路径，2. new Image 加载图片 3. 将加载成功的路径添加到 房源图片中
		const { imgLoupan } = this.state.fyInfo;
		const mainImg = JSON.parse(imgLoupan);
		if (mainImg) {
			let fyImg;
			fyImg = mainImg
				.map(item => item.list)
				.flat()
				.map(item => baseImgUrl + item.url + getImgLimit(750, 420));
			const allImg = await Promise.all(
				fyImg.map(src => this.loadImg(src))
			);
			const effectiveImg = allImg.filter(
				item => item.status === "success"
			);
			this.setState({
				fyImg: effectiveImg,
				isLoading: false
			});
			this.loadMap();
			this.setTabScrollTop();
		}
	}
	loadImg(src) {
		return new Promise((resolve, reject) => {
			const image = new Image();
			image.src = src;
			image.onload = () =>
				resolve({
					src: src,
					status: "success",
					w: image.width,
					h: image.height
				});
			image.onerror = () => resolve({ src: src, status: "fail" });
		});
	}
	handleClickToInfo() {
		navigate("/newHouse/info", { state: this.state.fyInfo });
	}
	handleClickToMap() {
		const { longitude, latitude } = this.state.fyInfo;
		navigate("/map", {
			state: {
				longitude,
				latitude
			}
		});
	}
	handleClickTab(item, index) {
		this.canScroll = false;
		this.setState({
			tabSelectActive: index
		});

		window.scrollTo(0, item.scrollTop); // 滚动是在函数完成之后才执行。
		console.log("窗口滚动是异步的吗？ 是的");
		setTimeout(() => {
			this.canScroll = true;
		});
	}
	handleScroll() {
		if (this.canScroll) {
			const { tabSelect } = this.state;
			const index = tabSelect.filter(
				item =>
					item.scrollTop < window.scrollY ||
					item.scrollTop === window.scrollY
			).length;
			this.setState({
				tabSelectActive: index - 1 < 0 ? 0 : index - 1
			});
		}
	}
	setTabScrollTop() {
		const { tabSelect } = this.state;
		const paddingTop = document.querySelector("#tabSelect").offsetHeight;
		tabSelect.forEach(item => {
			const curElement = document.querySelector(`#${item.id}`);
			item.scrollTop = curElement.offsetTop - paddingTop;
		});
		window.addEventListener("scroll", this.handleScroll);
	}
	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
	}
	/**
	 * @description 加载地图
	 */
	loadMap() {
		loadMap(mapKey).then(res => {
			this.initMap();
		});
	}
	/**
	 * @description 初始化地图
	 */
	initMap() {
		const { longitude, latitude } = this.state.fyInfo;
		const map = new BMap.Map("map", {
			enableMapClick: false
		});
		map.disableDragging();
		map.disableDoubleClickZoom();
		map.disablePinchToZoom();
		const point = new BMap.Point(longitude, latitude); // 小区的坐标。
		map.centerAndZoom(point, 16);
		var marker = new BMap.Marker(point); // 创建标注
		map.addOverlay(marker);
	}
	/**
	 * 房源特色
	 */
	getFeaturesList() {
		const { fyInfo } = this.state;
		const pushData = [
			{ label: "核心卖点", value: "sellPoint" },
			{ label: "环境配套", value: "environment" },
			{ label: "交通出行", value: "traffic" },
			{ label: "教育资源", value: "education" },
			{ label: "医疗配套", value: "hospital" },
			{ label: "生活娱乐", value: "amusement" },
			{ label: "绿地公园", value: "garden" }
		];

		return pushData
			.map(item => {
				return {
					label: item.label,
					value: fyInfo[item.value]
				};
			})
			.filter(item => item.value);
	}

	getTabList() {
		const tagList = [];
		const {
			ifImg,
			ifKey,
			ifOnly,
			ifMan,
			ifSubway,
			xuequ
		} = this.state.fyInfo;
		ifImg ? tagList.push("图片") : null;
		ifKey ? tagList.push("钥匙") : null;
		ifOnly != "0" && ifOnly != "否" ? tagList.push("唯一") : null;
		ifMan ? tagList.push(ifMan) : null;
		ifSubway != "0" ? tagList.push("地铁") : null;
		xuequ && xuequ == "是" ? tagList.push("学区") : null;
		return tagList;
	}
	async showPhoneSwipe(index) {
		const { hxInfo } = this.state;
		const allImg = await Promise.all(
			hxInfo.map(src => this.loadImg(baseImgUrl + src.images))
		);
		const items = hxInfo.map(item => ({
			src: baseImgUrl + item.images,
			title: `${item.name}户型${item.shi}室${item.ting}厅${item.wei}卫${item.area}㎡`,
			w: allImg.find(img => img.src === baseImgUrl + item.images).w,
			h: allImg.find(img => img.src === baseImgUrl + item.images).h
		}));
		const options = {
			index,
			shareButtons: [
				{
					id: "download",
					label: "Download image",
					url: "{{raw_image_url}}",
					download: true
				}
			]
		};
		this.phoneSwipe.current.init(items, options);
	}

	imgClick(index) {
		const { fyImg } = this.state;
		const items = fyImg.map(item => ({
			src: item.src,
			w: item.w,
			h: item.h
		}));
		const options = {
			index,
			shareButtons: [
				{
					id: "download",
					label: "Download image",
					url: "{{raw_image_url}}",
					download: true
				}
			]
		};
		this.phoneSwipe.current.init(items, options);
	}
	render() {
		const {
			fyInfo,
			isLoading,
			fyImg,
			shareUserInfo,
			tabSelect,
			tabSelectActive,
			hxInfo
		} = this.state;

		if (isLoading) {
			return <Loading type="spinningBubbles" color="#FA8072"></Loading>;
		} else {
			// 标签
			const tagList = this.getTabList();

			const tagMap = tagList.map((item, index) => (
				<Tag key={index} text={item}></Tag>
			));
			// 特色
			const features = this.getFeaturesList();
			return (
				<div>
					<FySwiper
						imgList={fyImg}
						imgClick={this.imgClick}
					></FySwiper>
					<section className={`${Style.session} ${Style.bgcolor}`}>
						<h2 className={Style.xqName}>{fyInfo.xqName}</h2>
						<div className={Style.tag_warp}>{tagMap}</div>
						<div className={Style.activeInfo}>
							<div>
								<span>{fyInfo.price}元/㎡</span>
								<span>价格</span>
							</div>
							<div>
								<span>{fyInfo.huxing}</span>
								<span>户型</span>
							</div>
							<div>
								<span>
									{fyInfo.buildAreaLow}-{fyInfo.buildAreaTop}
									㎡
								</span>
								<span>面积</span>
							</div>
						</div>
						<hr className={Style.session_hr} />
						<div className={Style.time_and_address}>
							<div>
								<span>发布</span>
								<p>{formatTime(fyInfo.fyInputDate)}</p>
							</div>
							<div>
								<span>地址</span>
								<p>
									{fyInfo.xzqName || "未知"}-
									{fyInfo.districtName || "未知"}-
									{fyInfo.address}
								</p>
							</div>
						</div>
					</section>
					<div className={Style.tab_selet} id="tabSelect">
						<ul>
							{tabSelect.map((item, index) => (
								<li
									className={Style.tab_selet_item}
									key={index}
									onClick={() =>
										this.handleClickTab(item, index)
									}
								>
									<span
										className={
											index === tabSelectActive
												? Style.tab_selet_active
												: ""
										}
									>
										{item.name}
									</span>
								</li>
							))}
						</ul>
					</div>
					{(features.length !== 0 || fyInfo.preferentialPolicy) && (
						<section
							className={`${Style.session} ${Style.bgcolor}`}
							id="sellPoint"
						>
							<h2>楼盘卖点</h2>
							{fyInfo.preferentialPolicy && (
								<p className={Style.preferential_policy}>
									（优惠政策）{fyInfo.preferentialPolicy}
								</p>
							)}
							{features.map((item, index) => (
								<div key={index} className={Style.features}>
									<h3>{item.label}</h3>
									<p>{item.value}</p>
								</div>
							))}
						</section>
					)}
					<section
						className={`${Style.session} ${Style.bgcolor}`}
						id="fyHx"
					>
						<h2>户型介绍</h2>
						<div className={Style.hx_warp}>
							<ul>
								{hxInfo.map((item, index) => (
									<li
										key={index}
										className={Style.hx_item}
										onClick={() =>
											this.showPhoneSwipe(index)
										}
									>
										<figure className={Style.hx_figure}>
											<img
												src={baseImgUrl + item.images + getImgLimit(280, 280)}
												alt="户型图片"
											/>
											<figcaption
												className={Style.hx_figcaption}
											>
												<span>{item.name}户型</span>
												<span>
													{item.shi}室{item.ting}厅
													{item.wei}卫
												</span>
												<span>{item.area}㎡</span>
											</figcaption>
										</figure>
									</li>
								))}
							</ul>
						</div>
					</section>
					<section
						className={`${Style.session} ${Style.bgcolor}`}
						id="dynamic"
					>
						<h2>楼盘动态</h2>
						<div className={Style.trends_list}>
							<TimeLine content={fyInfo.xffyTrends}></TimeLine>
						</div>
					</section>
					<section
						className={`${Style.session} ${Style.bgcolor}`}
						id="lpInfo"
					>
						<h2>房源信息</h2>
						<ul className={Style.info_list}>
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
								<span>{fyInfo.zhuangxiu || "暂无数据"}</span>
							</li>
							<li>
								<span>取暖方式</span>
								<span>{fyInfo.heatWay || "暂无数据"}</span>
							</li>
							<li>
								<span>学区名额</span>
								<span>{fyInfo.xuequ || "暂无数据"}</span>
							</li>
							<li>
								<span>交易权属</span>
								<span>{fyInfo.jyBelong || "暂无数据"}</span>
							</li>
							<li>
								<span>出证日期</span>
								<span>{fyInfo.chuzhengDate || "暂无数据"}</span>
							</li>
							<li>
								<span>产权年限</span>
								<span>{fyInfo.cqYear || "暂无数据"}</span>
							</li>
						</ul>
						<div
							onClick={() => this.handleClickToInfo()}
							className={Style.more_info}
						>
							更多房源信息
						</div>
					</section>
					<section
						className={`${Style.session} ${Style.bgcolor} ${Style.end_section}`}
						id="aroundMap"
					>
						<h2>周边配套</h2>
						<div
							className={Style.map_warp}
							onClick={() => this.handleClickToMap()}
						>
							<div id="map"></div>
							<ul>
								<li>
									<svg className="icon" aria-hidden="true">
										<use xlinkHref="#iconditie1"></use>
									</svg>
									<span>地铁</span>
								</li>
								<li>
									<svg className="icon" aria-hidden="true">
										<use xlinkHref="#icongongjiao"></use>
									</svg>
									<span>公交</span>
								</li>
								<li>
									<svg className="icon" aria-hidden="true">
										<use xlinkHref="#iconyinhang1"></use>
									</svg>
									<span>银行</span>
								</li>
								<li>
									<svg className="icon" aria-hidden="true">
										<use xlinkHref="#iconxuexiao"></use>
									</svg>
									<span>学校</span>
								</li>
								<li>
									<svg className="icon" aria-hidden="true">
										<use xlinkHref="#iconyaoxiang"></use>
									</svg>
									<span>医院</span>
								</li>
								<li>
									<svg className="icon" aria-hidden="true">
										<use xlinkHref="#icongouwu1"></use>
									</svg>
									<span>购物</span>
								</li>
							</ul>
						</div>
					</section>
					<div className={Style.shareUser_info}>
						<div className={Style.shareUser_name}>
							<img
								src={
									shareUserInfo.image
										? baseImgUrl + shareUserInfo.image
										: userHead
								}
								alt="分享人"
							/>
							<span>{shareUserInfo.name}</span>
						</div>
						<div className={Style.shareUser_tel}>
							<a href={`tel:${shareUserInfo.tel}`}>
								<svg className="icon" aria-hidden="true">
									<use xlinkHref="#icondianhua"></use>
								</svg>
								<span>电话咨询</span>
							</a>
						</div>
					</div>
					<PhoneSwipe ref={this.phoneSwipe}></PhoneSwipe>
				</div>
			);
		}
	}
}
