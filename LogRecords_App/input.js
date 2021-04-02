let obj = require("readline-sync");
let fs = require("fs");

module.exports.input = function () {
  let fname = obj.question("Enter First Name ");
  console.log("You First Name is " + fname);
  let lname = obj.question("Enter Last name ");
  console.log("You Last name is " + lname);
  let gender = obj.question("Enter gender ");
  console.log("You gender is " + gender);
  let email = obj.question("Enter email ");
  console.log("You email is " + email);

  let jsonArray = new Array();
  let data = fs.readFileSync("log.json");
  if (data.toString()) {
    jsonArray = JSON.parse(data.toString());
  }

  let currentDate = new Date();
  let date =
    currentDate.getDate() +
    "/" +
    (currentDate.getMonth() + 1) +
    "/" +
    currentDate.getFullYear() +
    " @ " +
    currentDate.getHours() +
    ":" +
    currentDate.getMinutes() +
    ":" +
    currentDate.getSeconds();

  let jsonObj = {
    fname,
    lname,
    gender,
    email,
    date,
  };
  jsonArray.push(jsonObj);

  let jsonString = JSON.stringify(jsonArray);
  fs.writeFileSync("log.json", jsonString);
  console.log("file written");
};
