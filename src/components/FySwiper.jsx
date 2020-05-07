import React, { Component } from "react";
import Swiper from "react-id-swiper";
import Style from "./componentStyle/swiper.module.css";

export default function FySwiper(props) {
	const { imgList } = props;
	const SwiperContent = imgList.map((item, index) => (
		<div key={index}>
			<img className={Style.swiper_img} src={item.src} alt="房源图片" />
		</div>
	));
	return <Swiper>{SwiperContent}</Swiper>;
}
