var express = require('express');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
server.listen(8000);

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket) {
    socket.on('sentmessage', function(data) {
        io.sockets.emit('newmessage', data);
        bot.say(config.channels[0], data);
    });
});

var config = {
    channels: ["#treestompz"],
    server: "irc.esper.net",
    botName: "treebot"
};

var irc = require('irc');

var bot = new irc.Client(config.server, config.botName, {
    channels: config.channels
});

bot.addListener("message#", function(sender, channel, text, message) {
    io.sockets.emit('newmessage', sender + ": " + text);
})