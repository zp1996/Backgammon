const express = require("express"),
	path = require("path"),
	app = express(),
	server = require("http").createServer(app);	

app.set("views", "./");
app.set("view engine", "jade");

app.use(express.static(path.join(__dirname, "build/")));

app.get('/', (req, res) => {
	res.render("./index", {
		pretty: true,
		title: "五子棋",
		js: ["index.js"]
	});
});

server.listen(1024);
console.log("server is on...");