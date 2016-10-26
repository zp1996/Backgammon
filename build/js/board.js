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

var index = 1;
var setType = {
	two: function two() {
		return index++ % 2 ? "black" : "white";
	}
};
function Board(selector) {
	this.flag = false;
	this.type = "";
	this.board = _util2.default.$(selector);
	this.active = null;
	this.pieces = _util2.default.burnTArray(15, 15);
}
Board.prototype.start = function () {
	this.type = "two";
	this.flag = true;
	this.init();
};
Board.prototype.init = function () {
	var _this = this;

	this.board.onclick = function (e) {
		if (e.target.className !== "board") return void 0;
		var x = e.clientX - _this.board.offsetLeft,
		    y = e.clientY - _this.board.offsetTop,
		    pos = _util2.default.getPos(x, y);
		_this.setPiece(pos);
	};
};
Board.prototype.setPiece = function (pos) {
	var div = document.createElement("div"),
	    className = setType[this.type](),
	    status = _config2.default.status[className],
	    left = _util2.default.calc(pos[1]) + "px",
	    top = _util2.default.calc(pos[0]) + "px";
	this.changeActive(left, top);
	div.className = className;
	div.style.left = left;
	div.style.top = top;
	this.pieces[pos[0]][pos[1]] = status;
	this.board.appendChild(div);
	this.win(pos, status);
};
Board.prototype.win = function (pos, status) {
	if ((0, _win2.default)(this.pieces, pos, status)) alert("赢了");
};
Board.prototype.changeActive = function (left, top) {
	if (this.active === null) {
		this.active = _util2.default.$("#active");
		this.active.style.display = "block";
	}
	this.active.style.left = left;
	this.active.style.top = top;
};
exports.default = Board;