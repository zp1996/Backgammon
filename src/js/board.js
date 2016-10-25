import util from "./util";

function Board (selector) {
	this.board = util.$(selector);
	this.pieces = util.burnTArray(15, 15);
	this.init();
}
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
	const div = document.createElement("div");
	div.className = Math.random() > 0.5 ? "white" : "black";
	div.style.left = util.calc(pos[1]) + "px";
	div.style.top = util.calc(pos[0]) + "px";
	this.board.appendChild(div);
};
export default Board;