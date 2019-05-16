const filterOptions = document.getElementById('filter-options');
const filter = document.getElementById('filter')
const option = document.querySelector('.option');


const changeOption =()=>{
 if(filterOptions.value == "price"){
  option.innerHTML = ` <input type="text" placeholder="min-price" id="min-price" required> <input type="text" placeholder="max-price" id="max-price" required> `
 }
 if(filterOptions.value == "status"){
  option.innerHTML = `<select name="" id="filter-status" class="filter-options">
  <option value="-1">Select a Car Status</option>
  <option value="new">New</option>
  <option value="used">Used</option>
 </select>`
 }

 if(filterOptions.value =="manufacturer"){
  option.innerHTML = `<select name="" id="filter-manufacturer">
  <option selected value="0">Select Manufacturer</option>
  <option value="Audi">Audi</option>
  <option value="BMW">BMW</option>
  <option value="Citroen">Citroen</option>
 <option value="Ford">Ford</option>
 <option value="Honda">Honda</option>
 <option value="Jaguar">Jaguar</option>
 <option value="LandRover">Land Rover</option>
 <option value="Mercedes">Mercedes</option>
 <option value="Mini">Mini</option>
 <option value="Nissan">Nissan</option>
 <option value="Toyota">Toyota</option>
 <option value="Volvo">Volvo</option>
 </select>`
 }
 if(filterOptions.value == '-1'){
 option.innerHTML = 'Please select a filter option'
 }
}





filterOptions.addEventListener('change', changeOption)


const filterSearch =(e)=>{
e.preventDefault();
modalControl();
setTimeout(()=>{
 window.location = 'admin.html'
}, 1800)

}
filter.addEventListener('submit', filterSearch)