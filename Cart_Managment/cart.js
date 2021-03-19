(function run() {
    addCartValue();
})();
var Item = /** @class */ (function () {
    function Item(name, price) {
        this.name = name;
        this.price = price;
    }
    return Item;
}());
function addToCart(obj) {
    console.log('please add to cart ' + obj.parentElement.innerHTML);
    var itemName;
    var priceValue;
    // get the item name and item price
    for (var i = 0; i < obj.parentElement.childNodes.length; i++) {
        if (obj.parentElement.childNodes[i].className == 'name') {
            itemName = obj.parentElement.childNodes[i].innerHTML;
        }
        if (obj.parentElement.childNodes[i].className == 'price') {
            priceValue = obj.parentElement.childNodes[i].innerHTML;
        }
    }
    itemName = itemName.split(' ')[1];
    priceValue = priceValue.split('$')[1];
    priceValue = parseFloat(priceValue);
    console.log("The item is " + itemName + " and its price is " + priceValue);
    var newItem = new Item(itemName, priceValue);
    var itemList = [];
    var entries = JSON.parse(localStorage.getItem('items'));
    if (entries == null) {
        console.log('local storage is null right now');
    }
    else {
        itemList = entries;
    }
    itemList.push(newItem);
    localStorage.setItem('items', JSON.stringify(itemList));
    console.log(localStorage.getItem('items'));
    addCartValue();
}
function addCartValue() {
    var itemList = [];
    var entries = JSON.parse(localStorage.getItem('items'));
    if (entries == null) {
        console.log('local storage is null right now');
    }
    else {
        itemList = entries;
    }
    var cartValue = "Cart Size: " + itemList.length;
    document.getElementById('cartValue').innerHTML = cartValue;
}
