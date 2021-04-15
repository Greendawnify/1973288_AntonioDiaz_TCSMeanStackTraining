let mongoose = require("mongoose");
let fs = require("fs");
mongoose.Promise = global.Promise;
let url = "mongodb://localhost:27017/meanstack";
const mongooseDbOption = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(url, mongooseDbOption);

let db = mongoose.connection;

let CallDataSchema = mongoose.Schema({
  _id: Number,
  source: String,
  destination: String,
  sourceLocation: String,
  destinationLocation: String,
  callDuration: String,
  roaming: String,
  callCharge: String,
});

let CallData = mongoose.model("", CallDataSchema, "CallData");

let jsonString = fs.readFileSync("call_data.json");
let data = JSON.parse(jsonString.toString());

db.on("error", (err) => console.log("error " + err));

for (let i = 0; i < data.length; i++) {
  db.once("open", () => {
    // create a schema

    // make the model

    let ex = new CallData({
      _id: data[i]._id,
      source: data[i].source,
      destination: data[i].destination,
      sourceLocation: data[i].sourceLocation,
      destinationLocation: data[i].destinationLocation,
      callDuration: data[i].callDuration,
      roaming: data[i].roaming,
      callCharge: data[i].callCharge,
    });
    ex.save((err, result) => {
      if (!err) {
        console.log("record inserted " + result);
      } else {
        console.log(err);
      }
      mongoose.disconnect();
    });
  });
}
