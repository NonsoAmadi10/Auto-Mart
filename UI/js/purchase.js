const purchaseForm = document.getElementById('purchase-form');
const purchasePrice = document.getElementById('purchase-order');


const purchaseCar=(e)=>{
 e.preventDefault();
 purchaseForm.innerHTML = '<h1>Your Order Was Successfully Made</h1>';
setTimeout(()=>{
 window.location="marketplace.html"
}, 1000)
}

purchaseForm.addEventListener('submit', purchaseCar)