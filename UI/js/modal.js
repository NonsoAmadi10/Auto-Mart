// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("open-modal");

// Get the <span> element that closes the modal
const close = document.getElementsByClassName("close")[0];

btn.addEventListener('click', ()=>{
 modal.style.display= "block";
})
close.addEventListener('click', ()=>{
 modal.style.display= "none";
})


