"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = require("./util");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Board(selector) {
	this.board = _util2.default.$(selector);
	this.pieces = _util2.default.burnTArray(15, 15);
	this.init();
}
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
	var div = document.createElement("div");
	div.className = Math.random() > 0.5 ? "white" : "black";
	div.style.left = _util2.default.calc(pos[1]) + "px";
	div.style.top = _util2.default.calc(pos[0]) + "px";
	this.board.appendChild(div);
};
exports.default = Board;