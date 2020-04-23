import React, { Component } from "react";
import Swiper from "react-id-swiper";
import "swiper/css/swiper.min.css";
import "./componentStyle/swiper.css";

export default function FySwiper(props) {
	const { imgList } = props;
	console.log(props);
	const SwiperContent = imgList.map((item, index) => (
		<div key={index}>
			<img className="swiper_img" src={item.src} alt="房源图片" />
		</div>
	));
	return <Swiper>{SwiperContent}</Swiper>;
}
