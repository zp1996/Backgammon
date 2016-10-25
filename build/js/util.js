"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var interval = _config2.default.size + _config2.default.interval;
function findOne(x) {
	var res = x < _config2.default.size ? 0 : x / interval | 0;
	return res;
}
var util = {
	$: function $(selector) {
		return document.querySelector(selector);
	},
	burnTArray: function burnTArray(row, col) {
		var res = [];
		for (var i = 0; i < row; i++) {
			res[i] = new Int8Array(col);
		}return res;
	},
	getPos: function getPos(x, y) {
		x = x - _config2.default.start;
		y = y - _config2.default.start;
		var res = [];
		res[0] = findOne(y);
		res[1] = findOne(x);
		return res;
	},
	calc: function calc(n) {
		return _config2.default.start + n * interval;
	}
};
exports.default = util;