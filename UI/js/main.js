const modal = document.getElementById("myModal");
const close = document.getElementsByClassName("close")[0];

const modalControl =(e)=>{ 
  
   modal.style.display= "block";
   close.addEventListener('click', ()=>{
    modal.style.display= "none";
   })
}