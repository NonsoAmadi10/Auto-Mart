const allbtn = document.querySelectorAll('#delete-ad'); //Get all buttons



const removeAd=(e)=>{
e.target.parentNode.remove()
}
allbtn.forEach((buttons)=>{
 // iterate through each buttons

 buttons.addEventListener('click', removeAd); // Remove the Advert
})

