import util from "./util";
import win from "./win";
import config from "./config";

var index = 1, last = null;
const setType = {
	two: () => {
		return index++ % 2 ? "black" : "white";
	}
};
function clean (dom) {
	dom.innerHTML = `<div id="active"></div>`;
	index = 1;
}
const type = {
	1: "白方",
	2: "黑方"
};
function Board (selector) {
	this.type = "";
	this.board = util.$(selector);
	clean(this.board);
	this.active = null;
	this.cache = [];
	this.pieces = util.burnTArray(15, 15);
}
Board.flag = false;
Board.prototype.start = function () {
	this.type = "two";
	Board.flag = true;
	this.init();
};
Board.prototype.init = function () {
	this.board.onclick = (e) => {
		if (e.target.className !== "board" || !Board.flag) 
			return void 0;
		const x = e.clientX - this.board.offsetLeft,
			y = e.clientY - this.board.offsetTop,
			pos = util.getPos(x, y);
		if (this.pieces[pos[0]][pos[1]])
			return void 0;
		this.setPiece(pos);
	};	
};
Board.prototype.setPiece = function (pos) {
	const div = document.createElement("div"),
		className = setType[this.type](),
		status = config.status[className],
		left = `${util.calc(pos[1])}px`,
		top = `${util.calc(pos[0])}px`;
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
	if (win(this.pieces, pos, status)) {
		Board.flag = false;
		alert(`${type[status]}胜利！`);
	}
}
Board.prototype.changeActive = function (left, top) {
	if (this.active === null) {
		this.active = util.$("#active");
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
	alert(`${type[config.status[setType[this.type]()]]}胜利！`);
};
export default Board;