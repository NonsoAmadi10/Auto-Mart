const source = 'https://automart-api-2019.herokuapp.com/api/v1/auth/signup';
const signupForm = document.getElementById('signup');


const signUp = (e) => {
  e.preventDefault();
  if (signupForm.password.value !== signupForm.password2.value) {
    flashMessages('Passwords do not match!', 'error');
    signupForm.password.value = '';
    signupForm.password2.value = '';
  }

  const data = {
    firstname: signupForm.firstname.value,
    lastname: signupForm.lastname.value,
    email: signupForm.email.value,
    password: signupForm.password.value,
    address: signupForm.address.value,
    confirmPassword: signupForm.password2.value,
    adminSecret: signupForm.adminSecret.value,
  };

  fetch(source, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then((res) => {
      if (res.status !== 'success') {
        flashMessages(res.error, 'error');

      }
      window.location = 'signin.html'

      flashMessages('Account Created! Kindly Login!', 'success');
    })
    .catch((error) => {
     flashMessages('Oops! Something went wrong while signing you up', 'error');
    });
};
signupForm.addEventListener('submit', signUp);
