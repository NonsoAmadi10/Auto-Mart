// Open the modal 
const Flagmodal = document.getElementById("flagModal");

// Get the button that opens the modal
const reportbtn = document.getElementById("report");

// Get the <span> element that closes the modal
const closereport = document.getElementsByClassName("closereport")[0];

reportbtn.addEventListener('click', ()=>{
 Flagmodal.style.display= "block";
})
closereport.addEventListener('click', ()=>{
 Flagmodal.style.display= "none";
})

//Handle the flag import { connect } from 'react-redux'

const flagForm = document.getElementById('flag-form');
const reason = document.getElementById('flag-reason').value;


const flagAd=(e)=>{
 e.preventDefault();
 flagForm.innerHTML = '<h3>Your Report Was Successfully received</h3>';
setTimeout(()=>{
 window.location="marketplace.html"
}, 1000)
}

flagForm.addEventListener('submit', flagAd)