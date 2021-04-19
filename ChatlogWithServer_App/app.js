let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);
let bodyParser = require("body-parser");

let mongoose = require("mongoose");
let url = "mongodb://localhost:27017/meanstack";
const mongooseDbOption = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let MessageSchema = mongoose.Schema({
  user: String,
  message: String,
});

let Message = mongoose.model("", MessageSchema, "Message");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("chat", (messageObj) => {
    console.log("User: " + messageObj.user);
    console.log("Message: " + messageObj.message);

    mongoose.connect(url, mongooseDbOption);
    let db = mongoose.connection;
    db.on("error", (err) => console.log(err));

    db.once("open", () => {
      let obj = new Message({
        user: messageObj.user,
        message: messageObj.message,
      });

      obj.save((err, result) => {
        if (!err) {
          console.log("message added " + result);
        } else {
          console.log("Message add error");
        }
        mongoose.disconnect();
      });
    });
  });
});

http.listen(9090, () => console.log("Running server on port 9090"));
