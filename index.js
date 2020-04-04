let express = require("express");
let app = express();
let server = require("http").createServer(app);
let io = require("socket.io").listen(server);
const PORT = process.env.PORT || 5000;

server.listen(PORT);

app.get("/", function(request, respons) {
    respons.sendFile(__dirname + "/index.html");
});

users = [];
connections = [];

io.sockets.on('connection', function(socket) {
    console.log("успешное соединение");

    connections.push(socket);

    socket.on("disconnect", function(data) {
        connections.splice(connections.indexOf(socket), 1);
        console.log("отключились");
    });

    socket.on("send mess", function(data) {
        io.sockets.emit("add mess", {mess: data.mess, name: data.name, className: data.className});
    });
});