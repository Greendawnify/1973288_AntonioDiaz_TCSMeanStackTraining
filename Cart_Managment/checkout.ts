let allItems = JSON.parse(localStorage.getItem('items'));
console.log(allItems);

let total:number = 0;
for(let i =0; i < allItems.length; i++){
    console.log(allItems[i]);

    let tbody:any = document.getElementById('table');
    let row:any = tbody.insertRow(0);

    let item:any = row.insertCell(0);
    item.innerHTML = allItems[i].name;

    let price:any = row.insertCell(1);
    price.innerHTML = `$${allItems[i].price}`;
    total += allItems[i].price;
}

document.getElementById('totalPrice').innerHTML = `Total Price: $${total}`;

function clearData():void{
    localStorage.clear();
    console.log('cleared');
    window.location.reload();
    
}