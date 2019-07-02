// Flash messages 

const flashMessages =(message, type) => {
 const flashDiv = document.querySelector('.flash-messages');
 flashDiv.style.display = 'block';

 if (type === 'success') {
  flashDiv.textContent = message;
  flashDiv.classList.add('success');
 }
 else if (type === 'error') {
  flashDiv.textContent = message;
  flashDiv.classList.add('error');
 }
 else {
  flashDiv.textContent = message;
  flashDiv.classList.add('blue');
 }

 setTimeout(() => {
  flashDiv.textContent = '';
  flashDiv.style.display = 'none';
 }, 1500)
}