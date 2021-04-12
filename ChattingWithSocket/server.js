let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("Client Connected ...");

  socket.on("chat", (message) => {
    console.log("Hello " + message.name);
    console.log("Your message: " + message.msg);
  });
});

http.listen(9090, () => console.log("Server running on port number 9090"));
