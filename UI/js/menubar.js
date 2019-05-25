const openmenu = document.querySelector('.openmenu');
const closemenu = document.querySelector('.closebtn');
const sidepanel = document.getElementById('sidebar');
const mainNav = document.getElementById('main');

const openPanel=()=>{
sidepanel.style.width = "250px";
mainNav.style.marginRight = "250px";
}

const closePanel=()=>{
 sidepanel.style.width = "0px";
 mainNav.style.marginRight = "0px";
 }

openmenu.addEventListener('click', openPanel);
closemenu.addEventListener('click', closePanel);

