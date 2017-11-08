var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/node_modules'));
app.get('/screen', function(req, res, next) {
    res.sendFile(__dirname + '/html/index.html');
});
io.on('connection', function(socket) {
    console.log('Client connected...');
    setTimeout(() => {
        socket.emit("team", Math.random() > 0.5 ? "Nessa" : "Islam");
    }, 2000)

})
server.listen(4200);