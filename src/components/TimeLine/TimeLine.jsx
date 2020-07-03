import React, { Component } from 'react';
import TimeLineItem from './TimeLineItem.jsx';


class TimeLine extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { content } = this.props;
		const allTimeLineItem = content.map((item, index) =>
			<TimeLineItem key={index} trends={item} isLast={index + 1 === content.length}></TimeLineItem>
		)
		return <ul>
			{allTimeLineItem}
		</ul>
	}
}
export default TimeLine;