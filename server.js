var express = require('express');
const connect = require('./database/connection.js');
var controller =  require('./controllers/myController');
const http = require("http");
var path = require('path')

var app = express();

app.set('view engine', 'ejs');
app.set("view options", {layout: false});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
	res.render("user_name");
});
app.get('/chat/:name', controller.index);

const httpServer = http.createServer(app);

var server = httpServer.listen(8000);

const socket = require("socket.io")(server);
require("./socket/socket.js")(socket);
