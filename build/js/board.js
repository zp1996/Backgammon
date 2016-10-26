"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = require("./util");

var _util2 = _interopRequireDefault(_util);

var _win = require("./win");

var _win2 = _interopRequireDefault(_win);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var index = 1,
    last = null;
var setType = {
	two: function two() {
		return index++ % 2 ? "black" : "white";
	}
};
function clean(dom) {
	dom.innerHTML = "<div id=\"active\"></div>";
	index = 1;
}
var type = {
	1: "白方",
	2: "黑方"
};
function Board(selector) {
	this.type = "";
	this.board = _util2.default.$(selector);
	clean(this.board);
	this.active = null;
	this.cache = [];
	this.pieces = _util2.default.burnTArray(15, 15);
}
Board.flag = false;
Board.prototype.start = function () {
	this.type = "two";
	Board.flag = true;
	this.init();
};
Board.prototype.init = function () {
	var _this = this;

	this.board.onclick = function (e) {
		if (e.target.className !== "board" || !Board.flag) return void 0;
		var x = e.clientX - _this.board.offsetLeft,
		    y = e.clientY - _this.board.offsetTop,
		    pos = _util2.default.getPos(x, y);
		if (_this.pieces[pos[0]][pos[1]]) return void 0;
		_this.setPiece(pos);
	};
};
Board.prototype.setPiece = function (pos) {
	var div = document.createElement("div"),
	    className = setType[this.type](),
	    status = _config2.default.status[className],
	    left = _util2.default.calc(pos[1]) + "px",
	    top = _util2.default.calc(pos[0]) + "px";
	div.className = className;
	div.style.left = left;
	div.style.top = top;
	this.changeActive(left, top);
	this.pieces[pos[0]][pos[1]] = status;
	this.board.appendChild(div);
	this.toCache(pos, [left, top]);
	this.win(pos, status);
};
Board.prototype.win = function (pos, status) {
	if ((0, _win2.default)(this.pieces, pos, status)) {
		Board.flag = false;
		alert(type[status] + "\u80DC\u5229\uFF01");
	}
};
Board.prototype.changeActive = function (left, top) {
	if (this.active === null) {
		this.active = _util2.default.$("#active");
		this.active.style.display = "block";
	}
	this.active.style.left = left;
	this.active.style.top = top;
};
Board.prototype.toCache = function (pos, rpos) {
	this.cache.push({
		pos: pos,
		last: last
	});
	last = rpos;
};
Board.prototype.regret = function () {
	var c = this.cache[this.cache.length - 1],
	    pos = c.last;
	this.remove(c.pos);
	if (pos === null) {
		this.active.style.display = "none";
		return this.active = null;
	}
	this.cache.length--;
	this.changeActive(pos[0], pos[1]);
};
Board.prototype.remove = function (pos) {
	this.board.removeChild(this.board.lastChild);
	this.pieces[pos[0]][pos[1]] = 0;
	index--;
};
Board.prototype.defeat = function () {
	Board.flag = false;
	index--;
	alert(type[_config2.default.status[setType[this.type]()]] + "\u80DC\u5229\uFF01");
};
exports.default = Board;