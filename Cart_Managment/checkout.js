var allItems = JSON.parse(localStorage.getItem('items'));
console.log(allItems);
var total = 0;
for (var i = 0; i < allItems.length; i++) {
    console.log(allItems[i]);
    var tbody = document.getElementById('table');
    var row = tbody.insertRow(0);
    var item = row.insertCell(0);
    item.innerHTML = allItems[i].name;
    var price = row.insertCell(1);
    price.innerHTML = "$" + allItems[i].price;
    total += allItems[i].price;
}
document.getElementById('totalPrice').innerHTML = "Total Price: $" + total;
function clearData() {
    localStorage.clear();
    console.log('cleared');
    window.location.reload();
}
