import Board from "./board";
import util from "./util";

var board = null;
util.$("#t-start").onclick = function () {
	if (Board.flag) {
		alert("这局搞完在开始下一局吧。。。")
		return void 0;
	}
	board = new Board(".board");
	board.start();
};
util.$("#regret").onclick = function () {
	if (Board.flag) {
		return board.regret();
	}
	alert("现在不能悔棋啦！开一局玩起来~");
};
util.$("#admin-defeat").onclick = function () {
	if (Board.flag) {
		return board.defeat();
	}
	alert("现在不能认输啦！开一局玩起来~");
}

