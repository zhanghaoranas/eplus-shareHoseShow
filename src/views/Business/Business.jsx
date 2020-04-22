import React, { Component } from "react";
import Loading from '../../components/Loading.jsx';
import { baseUrl, baseImgUrl } from "../../config.js";
export default class Business extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...props.location.state,
			fyInfo: null,
			fyImg: [],
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

	}

	loadImg(src) {
		return new Promise((resolve, reject) => {
			const image = new Image();
			image.src = src;
			image.onload = () => resolve({ src: src, status: 'success' });
			image.onerror = () => resolve({ src: src, status: 'fail' })
		})
	}

	render() {
		const { fyInfo, isLoading } = this.state;

		if (isLoading) {
			return <Loading type="spinningBubbles" color="#FA8072"></Loading>;
		} else {
			return <div>{fyInfo.id}</div>;
		}
	}
}
