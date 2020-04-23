import React, { Component } from "react";
import Loading from "../../components/Loading.jsx";
import FySwiper from "../../components/FySwiper.jsx";
import Tag from "../../components/Tag.jsx";

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
			return (
				<div>
					<FySwiper imgList={fyImg}></FySwiper>
					<section>
						<h2>{fyInfo.xqName}</h2>
						<div>{tagMap}</div>
					</section>
				</div>
			);
		}
	}
}
