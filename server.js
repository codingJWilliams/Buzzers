var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static("assets"))

app.use(express.static(__dirname + '/node_modules'));
app.get('/screen', function(req, res, next) {
    res.sendFile(__dirname + '/html/index.html');
});
app.get('/nessa', function(req, res, next) {
    res.sendFile(__dirname + '/html/nessa.html');
});
app.get('/islam', function(req, res, next) {
    res.sendFile(__dirname + '/html/islam.html');
});
var canPress = true;
io.on('connection', function(socket) {
    console.log('Client connected...');
    socket.on("plsBuzz", function (team) {
        if (canPress) {
            canPress = !canPress;
            setTimeout(function() { canPress = true; }, 2000);
            io.emit("buzz", team);
        } 
    })

})
server.listen(443);