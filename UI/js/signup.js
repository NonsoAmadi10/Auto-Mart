const signupForm = document.getElementById('signup');


const signUp=(e)=>{
 e.preventDefault();
 window.location = 'signin.html'
}
signupForm.addEventListener('submit', signUp);