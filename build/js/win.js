"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var pieces = null,
    pos = null,
    min = 0,
    max = 0,
    status = 0;
function win(p, ps, s) {
	pieces = p;
	pos = ps;
	status = s;
	max = p.length - 1;
	return leftBot() + rightTop() === 4 || leftTop() + rightBot() === 4 || left() + right() === 4 || top() + bot() === 4;
}
function rightTop() {
	var x = pos[1] + 1,
	    y = pos[0] - 1,
	    res = 0;
	for (var i = 0; i < 4; i++) {
		if (x > max || y < min || pieces[y - i][x + i] !== status) break;
		res++;
	}
	return res;
}
function leftBot() {
	var x = pos[1] - 1,
	    y = pos[0] + 1,
	    res = 0;
	for (var i = 0; i < 4; i++) {
		if (y > max || x < min || pieces[y + i][x - i] !== status) break;
		res++;
	}
	return res;
}
function leftTop() {
	var x = pos[1] - 1,
	    y = pos[0] - 1,
	    res = 0;
	for (var i = 0; i < 4; i++) {
		if (x < min || y < min || pieces[y - i][x - i] !== status) break;
		res++;
	}
	return res;
}
function rightBot() {
	var x = pos[1] + 1,
	    y = pos[0] + 1,
	    res = 0;
	for (var i = 0; i < 4; i++) {
		if (x > max || y > max || pieces[y + i][x + i] !== status) break;
		res++;
	}
	return res;
}
function left() {
	var x = pos[1] - 1,
	    y = pos[0],
	    res = 0;
	for (var i = 0; i < 4; i++) {
		if (x < min || pieces[y][x - i] !== status) break;
		res++;
	}
	return res;
}
function right() {
	var x = pos[1] + 1,
	    y = pos[0],
	    res = 0;
	for (var i = 0; i < 4; i++) {
		if (x > max || pieces[y][x + i] !== status) break;
		res++;
	}
	return res;
}
function top() {
	var x = pos[1],
	    y = pos[0] - 1,
	    res = 0;
	for (var i = 0; i < 4; i++) {
		if (y < min || pieces[y - i][x] !== status) break;
		res++;
	}
	return res;
}
function bot() {
	var x = pos[1],
	    y = pos[0] + 1,
	    res = 0;
	for (var i = 0; i < 4; i++) {
		if (y > max || pieces[y + i][x] !== status) break;
		res++;
	}
	return res;
}
exports.default = win;