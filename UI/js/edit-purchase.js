const allbtn = document.querySelectorAll('#edit-purchase');


const openDiv =(e)=>{
let header = document.querySelector('.ed-header');
  modal.style.display= "block";
console.log(e.target.parentElement)
 if(e.target.innerHTML !== 'Edit Purchase'){
  header.innerHTML = 'Make a New Offer'
 }
 if(e.target.innerHTML == 'Edit Purchase'){
  header.innerHTML = 'Edit Purchase'
 }
 };

allbtn.forEach((item)=>{
 item.addEventListener('click', openDiv)
})



const modal = document.getElementById("newModal");




// Get the <span> element that closes the modal
const close = document.getElementsByClassName("close")[0];


close.addEventListener('click', ()=>{
 modal.style.display= "none";
})


// Handles Form Submission 

const editForm = document.getElementById('newoffer-form');

const editOrder = (e)=>{
 e.preventDefault()
 editForm.innerHTML = " Your Order Has been Updated ";
 
 setTimeout(()=>{
  window.location = 'orders.html'
 }, 1500)
 
}
editForm.addEventListener('submit', editOrder);