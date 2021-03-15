// (function clear() {
//   localStorage.clear();
// })();

function addProject() {
  // check input is good
  var c = document.getElementById("name").value.trim();
  var p = document.getElementById("project").value.trim();
  var b = document.getElementById("budget").value.trim();

  if (c == "" || p == "" || b == "") {
    window.alert("Not acceptable input");
    return;
  }

  // json the info
  var obj = {
    client: c,
    project: p,
    budget: b,
  };
  jsonString = JSON.stringify(obj);

  // add to sesion storage
  localStorage.setItem(c, jsonString);

  // reset input
  resetData();
}

function resetData() {
  document.getElementById("name").value = "";
  document.getElementById("project").value = "";
  document.getElementById("budget").value = "";
}
