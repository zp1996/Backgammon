import config from "./config";

const interval = config.size + config.interval;
function findOne (x) {
	var res = x < config.size ? 0 :
						x / interval | 0;
	return res; 
}
const util = {
	$: function (selector) {
		return document.querySelector(selector);
	},
	burnTArray: function (row, col) {
		const res = [];
		for (let i = 0; i < row; i++)
			res[i] = new Int8Array(col);
		return res;
	},
	getPos: function (x, y) {
		x = x - config.start;
		y = y - config.start;
		const res = [];
		res[0] = findOne(y);
		res[1] = findOne(x);
		return res;
	},
	calc: function(n) {
		return config.start + n * interval;
	}
};
export default util;