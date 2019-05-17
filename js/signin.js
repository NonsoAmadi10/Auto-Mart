const signinForm = document.getElementById('signin');
const adminSecret = document.getElementById('admin-secret');


const signIn=(e)=>{
 e.preventDefault();
 adminSecret.type = 'text';
 if(adminSecret.value == '12345'){
  window.location = 'admin.html'
 }else{
  window.location= 'marketplace.html'
 }
 
}
signinForm.addEventListener('submit', signIn);