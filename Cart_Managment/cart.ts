(function run():void{
    addCartValue();
})();

class Item{
    name:string;
    price:number;
    constructor(name:string, price:number){
        this.name = name;
        this.price = price
    }
}

function addToCart(obj:any):void{
    console.log('please add to cart ' + obj.parentElement.innerHTML);
    let itemName:any;
    let priceValue:any;

    // get the item name and item price
    for(let i =0; i<obj.parentElement.childNodes.length; i++){
        if(obj.parentElement.childNodes[i].className == 'name'){
            itemName = obj.parentElement.childNodes[i].innerHTML;
        }
        if(obj.parentElement.childNodes[i].className == 'price'){
            priceValue = obj.parentElement.childNodes[i].innerHTML;
        }
    }

    itemName = itemName.split(' ')[1];
    priceValue = priceValue.split('$')[1];
    priceValue = parseFloat(priceValue);
    console.log(`The item is ${itemName} and its price is ${priceValue}`);
    let newItem = new Item(itemName, priceValue);

    let itemList:any[] = [];
    let entries = JSON.parse(localStorage.getItem('items'));
     if(entries == null){
         console.log('local storage is null right now');

     }else{
         itemList = entries;
     }

    itemList.push(newItem);
    localStorage.setItem('items', JSON.stringify(itemList));
    console.log(localStorage.getItem('items'));
    addCartValue();
}

function addCartValue():void{
    let itemList:any[] = [];
    let entries = JSON.parse(localStorage.getItem('items'));
     if(entries == null){
         console.log('local storage is null right now');

     }else{
         itemList = entries;
     }

     let cartValue:string = `Cart Size: ${itemList.length}`;

     document.getElementById('cartValue').innerHTML = cartValue;

}