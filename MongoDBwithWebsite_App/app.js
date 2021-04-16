let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);
let port = 9090;
let bodyParser = require("body-parser");

let mongoose = require("mongoose");
let url = "mongodb://localhost:27017/meanstack";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongooseDbOption = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// mongoose.connect(url, mongooseDbOption);
// let db = mongoose.connection;

let CourseSchema = mongoose.Schema({
  _id: Number,
  name: String,
  description: String,
  amount: Number,
});

const Course = mongoose.model("", CourseSchema, "Course");

//db.on("error", (err) => console.log(err));

// get requests
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/add", (req, res) => {
  res.sendFile(__dirname + "/add.html");
});
app.get("/delete", (req, res) => {
  res.sendFile(__dirname + "/delete.html");
});
app.get("/update", (req, res) => {
  res.sendFile(__dirname + "/update.html");
});
let fetchObjs = [];
app.get("/fetch", async (req, res) => {
  res.sendFile(__dirname + "/fetch.html");

  mongoose.connect(url, mongooseDbOption);
  let db = mongoose.connection;
  db.on("error", (err) => console.log(err));

  db.once("open", () => {
    Course.find({}, (err, result) => {
      if (!err) {
        result.forEach((doc) => fetchObjs.push(doc));
        console.log(fetchObjs);
      }
      mongoose.disconnect();
    });
  });
});

//post requests
app.post("/addCourse", (req, res) => {
  let _id = req.body.ID;
  let name = req.body.name;
  let description = req.body.description;
  let amount = req.body.amount;
  console.log(
    `From add course I got - ID:${_id}, Name:${name}, desc:${description}, amount:${amount}`
  );
  mongoose.connect(url, mongooseDbOption);
  let db = mongoose.connection;

  db.on("error", (err) => console.log(err));

  db.once("open", () => {
    let obj = new Course({
      _id: _id,
      name: name,
      description: description,
      amount: amount,
    });
    console.log("Created new course obj: ", obj);
    obj.save((err, result) => {
      if (!err) {
        console.log("Course added " + result);
      } else {
        console.log("Course add error " + err);
      }
      mongoose.disconnect();
    });
  });
});

app.post("/updateCourse", (req, res) => {
  let id = req.body.ID;
  let price = req.body.price;

  mongoose.connect(url, mongooseDbOption);
  let db = mongoose.connection;
  db.on("error", (err) => console.log(err));

  db.once("open", () => {
    Course.updateOne(
      { _id: id },
      { $set: { amount: price } },
      (err, result) => {
        if (!err) {
          if (result.nModified > 0) {
            console.log("Course updated");
          } else {
            console.log('Course didn"t update');
          }
        } else {
          console.log(err);
        }
        mongoose.disconnect();
      }
    );
  });
});

app.post("/deleteCourse", (req, res) => {
  let id = req.body.ID;

  mongoose.connect(url, mongooseDbOption);
  let db = mongoose.connection;
  db.on("error", (err) => console.log(err));

  db.once("open", () => {
    Course.deleteOne({ _id: id }, (err, result) => {
      if (!err) {
        if (result.deletedCount > 0) {
          console.log("record has been deleted");
        } else {
          console.log("No record found");
        }
      } else {
        console.log(err);
      }
      mongoose.disconnect();
    });
  });
});

io.on("connection", (socket) => {
  console.log("Client conected to application...");

  socket.on("table", (message) => {
    // send info from the server to the clients
    console.log("Client sent: " + message);
    io.emit("fetch", fetchObjs);
    fetchObjs.length = 0;
  });
});

http.listen(port, () => console.log("Server running on " + port));
