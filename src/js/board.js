import util from "./util";
import win from "./win";
import config from "./config";

var index = 1;
const setType = {
	two: () => {
		return index++ % 2 ? "black" : "white";
	}
};
function Board (selector) {
	this.flag = false;
	this.type = "";
	this.board = util.$(selector);
	this.active = null;
	this.pieces = util.burnTArray(15, 15);
}
Board.prototype.start = function () {
	this.type = "two";
	this.flag = true;
	this.init();
};
Board.prototype.init = function () {
	this.board.onclick = (e) => {
		if (e.target.className !== "board") 
			return void 0;
		const x = e.clientX - this.board.offsetLeft,
			y = e.clientY - this.board.offsetTop,
			pos = util.getPos(x, y);
		this.setPiece(pos);
	};	
};
Board.prototype.setPiece = function (pos) {
	const div = document.createElement("div"),
		className = setType[this.type](),
		status = config.status[className],
		left = `${util.calc(pos[1])}px`,
		top = `${util.calc(pos[0])}px`;
	this.changeActive(left, top);
	div.className = className;
	div.style.left = left;
	div.style.top = top;
	this.pieces[pos[0]][pos[1]] = status;
	this.board.appendChild(div);
	this.win(pos, status);
};
Board.prototype.win = function (pos, status) {
	if (win(this.pieces, pos, status)) 
		alert("赢了");
}
Board.prototype.changeActive = function (left, top) {
	if (this.active === null) {
		this.active = util.$("#active");
		this.active.style.display = "block";
	}
	this.active.style.left = left;
	this.active.style.top = top;
};
export default Board;