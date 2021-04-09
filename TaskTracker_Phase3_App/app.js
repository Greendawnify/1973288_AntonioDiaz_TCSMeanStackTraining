let fs = require("fs");
let http = require("http");
let url = require("url");
let port = 8080;
let index = 0;
let taskArray = [];

let form = ` 
<html>
<head></head>
<body>
<form  method="">
<label>Emp ID:</label>
<input type="text" name = 'empID' id = 'empID'> <br>

<label>Task ID:</label>
<input type="text" name = 'taskID' id = 'taskID'> <br>

<label>Task:</label>
<input type="text" name = 'task' id = 'task'> <br>

<label>Deadline:</label>
<input type="date" name = 'date' id = 'date'> <br>
<input type="submit" value="Add Task">
</form>
<br>
<br>
<form method="">
    <label >Task ID:</label>
    <input type="text" name = 'searchTask'/> <br>
    <input type="submit" value="Delete Task">
</form>
<br>
<br>
<form>
    <input type="submit" value="Update" name = "show">
</form>

  </body>
  </html>
`;

let secondForm = `
<html>
<head></head>
<body>
</body>
</html>
`;

let server = http.createServer((req, res) => {
  if (req.url != "/favicon.ico") {
    res.write(form);

    if (req.url != "/" && index === 0) {
      let details = url.parse(req.url, true).query;

      if (details.empID) {
        let empID = details.empID;
        let taskID = details.taskID;
        let task = details.task;
        let date = details.date;

        let taskObj = {
          empID,
          taskID,
          task,
          date,
        };

        let oldTaskData = fs.readFileSync("tasks.json");
        if (oldTaskData.toString()) {
          taskArray = JSON.parse(oldTaskData.toString());
        }

        taskArray.push(taskObj);

        let newJsonData = JSON.stringify(taskArray);
        fs.writeFileSync("tasks.json", newJsonData);
        console.log("task added to json");
        index = 1;
      } else if (details.searchTask) {
        let oldTaskData = fs.readFileSync("tasks.json");
        if (oldTaskData.toString()) {
          taskArray = JSON.parse(oldTaskData.toString());

          let taskIndex = -1;
          for (let i = 0; i < taskArray.length; i++) {
            if (taskArray[i].taskID == details.searchTask) {
              taskIndex = i;
            }
          }

          if (taskIndex != -1) {
            taskArray.splice(taskIndex, 1);
            console.log("What is left in the array", taskArray);
            let newJsonData = JSON.stringify(taskArray);
            fs.writeFileSync("tasks.json", newJsonData);
            console.log("Task Deleted");
          } else {
            console.log("The task ID does not match: ", taskIndex);
          }
        } else {
          console.log("There are not tasks to delete");
        }
      } else if (details.show) {
        secondForm = FillTable();
        res.write(secondForm);
      }
    }

    res.end();
  }
});

let firstHalfOfTable = `
<html>
<head></head>
<body>
<table>
  <thead>
      <tr>
          <td>Emp ID</td>
          <td>Task ID</td>
          <td>Task</td>
          <td>Deadline</td>
      </tr>
  </thead>
  <tbody id = 'tbody'>
`;

let secondHalfOfTable = `
</tbody>
</table>
</body>
</html>
`;

function FillTable() {
  let taskData = fs.readFileSync("tasks.json");
  if (taskData.toString()) {
    let newString = ``;
    let array = JSON.parse(taskData.toString());
    for (let i = 0; i < array.length; i++) {
      newString += `
      <tr>
        <td>${array[i].empID}</td>
        <td>${array[i].taskID}</td>
        <td>${array[i].task}</td>
        <td>${array[i].date}</td>
      </tr>
      `;
    }

    return firstHalfOfTable + newString + secondHalfOfTable;
  }
}

server.listen(port, () => console.log("Server listening at port " + port));
