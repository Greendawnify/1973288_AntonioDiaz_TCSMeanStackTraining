var tbody = document.getElementsByTagName("tbody")[0];
console.log(localStorage.length);

var total = 0;
Object.keys(localStorage).forEach(function (key) {
  console.log(localStorage.getItem(key));

  var newObj = JSON.parse(localStorage.getItem(key));

  var newRow = tbody.insertRow(tbody.length);

  var cell1 = newRow.insertCell(0);
  cell1.innerHTML = newObj.client;

  var cell2 = newRow.insertCell(1);
  cell2.innerHTML = newObj.project;

  var cell3 = newRow.insertCell(2);
  cell3.innerHTML = "$" + newObj.budget;

  total += parseInt(newObj.budget);
  document.getElementById("total").innerHTML =
    "Total Annual Budget = $" + total;
});
