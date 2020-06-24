import React, { Component } from "react";
import Swiper from "react-id-swiper";
import Style from "./componentStyle/swiper.module.css";

class FySwiper extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: 1
		};
	}
	handleSlideChange(index) {
		this.setState({
			active: index + 1
		});
	}
	handleClickImg(index) {
		this.props.imgClick(index);
	}
	render() {
		const { imgList } = this.props;
		const { active } = this.state;
		const SwiperContent = imgList.map((item, index) => (
			<div key={index} onClick={() => this.handleClickImg(index)}>
				<img
					className={Style.swiper_img}
					src={item.src}
					alt="房源图片"
				/>
			</div>
		));
		const self = this;
		const params = {
			on: {
				slideChangeTransitionEnd: function() {
					self.handleSlideChange(this.activeIndex);
				}
			}
		};
		return (
			<div className={Style.swiper_warp}>
				<Swiper {...params}>{SwiperContent}</Swiper>
				<span>{`${active}/${SwiperContent.length}`}</span>
			</div>
		);
	}
}

export default FySwiper;
