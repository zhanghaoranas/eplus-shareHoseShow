
import React, { Component } from 'react';
import Style from "../componentStyle/timeLineItem.module.css";
import { baseImgUrl } from '../../config.js'
import { formatTime, getImgLimit } from "../../utils";
class TimeLineItem extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { trends, isLast } = this.props;
		const imgList = JSON.parse(trends.images).slice(0.3); // 最多展示3张图片。
		return <li className={Style.trends_item}>
			<div className={Style.left_line}>
				<i></i>
				{!isLast && <div></div>}
			</div>
			<div className={Style.right_content}>
				<div className={Style.time}>
					{formatTime(trends.dutyDate)}
				</div>
				<p className={Style.content}>{trends.contents}</p>
				<ul className={Style.imgBox}>
					{imgList.map((item, index) =>
						<li className={Style.trends_img_item} key={index}>
							<img src={baseImgUrl + item.url + getImgLimit(200, 200)}></img>
						</li>
					)}
				</ul>
			</div>
		</li>
	}
}
export default TimeLineItem;