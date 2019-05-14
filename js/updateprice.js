const price = document.getElementById('price');
const status= document.getElementById('update-status');
const updateForm = document.getElementById('update-form');


const update=(e)=>{
 e.preventDefault();
 const regNewprice = document.getElementById('new-price').value.replace(',','');
 const newPrice = Number(regNewprice);
 
 const newStatus = document.getElementById('status').value;
 price.innerHTML = `<strong> PRICE: </strong> NGN  ${newPrice.toFixed(2)}`;
 if(newStatus !== '0'){
  status.innerHTML = `<strong> Status: ${newStatus}</strong>`;
 }else{
  status.innerHTML = `<strong> Status: </strong> Available`;
 }
 modal.style.display= "none";

 
}

updateForm.addEventListener('submit', update);