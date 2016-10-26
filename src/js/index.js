import Board from "./board";
import util from "./util";

const board = new Board(".board");
util.$("#t-start").onclick = function () {
	if (board.flag) {
		alert("这局搞完在开始下一局吧。。。")
		return void 0;
	}
	board.start();
};


