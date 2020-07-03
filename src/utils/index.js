function formatTime(time, cFormat = "{y}-{m}-{d}") {
	if (!time) return null;
	if (arguments.length === 0) return null;
	if (`${time}`.length === 10) {
		time = +time * 1000;
	}

	const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
	let date;
	if (typeof time === "object") {
		date = time;
	} else {
		date = new Date(time);
	}
	const formatObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay()
	};
	return format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
		let value = formatObj[key];
		if (key === "a")
			return ["一", "二", "三", "四", "五", "六", "日"][value - 1];
		if (result.length > 0 && value < 10) {
			value = `0${value}`;
		}
		return value || 0;
	});
}
/**
 *
 * @param {number} width
 * @param {number} height
 * @description 七牛限制图片尺寸，以及压缩
 */
function getImgLimit(width, height, limit = 68) {
	return `?imageView2/1/w/${width}/h/${height}/format/jpg/interlace/1/q/${limit}|imageslim`;
}
export { formatTime, getImgLimit };
