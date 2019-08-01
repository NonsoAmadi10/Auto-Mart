
const filter = document.getElementById('filter')
const option = document.querySelector('.adverts');



const filterSearch =(e)=>{
e.preventDefault();
option.innerHTML = "Loading..."

setTimeout(() =>{
 const price = e.target["max_price"].value

const randomPrice =  Math.floor(Math.random() * Number(price));
console.log(randomPrice)
option.innerHTML=` <h2>Available Cars </h2>
<div class="products">
  <div class="image-div"><img src="./images/asphalt-auto-automobile-170811.jpg" alt="" class="small-img"></div>
  <div class="ad-details">
    <h3>BMW SEDAN</h3>
    <hr>

    <p>Sold By: COSCHARIS MOTORS</p>
    <p class="btn-default"> ${randomPrice} </p>
    <button class="btn-primary">View AD </button>
    
  </div>
  
</div>
<div class="products">
    <div class="image-div"><img src="./images/automobile-automotive-car-116675.jpg" alt="" class="small-img"></div>
    <div class="ad-details">
      <h3>LAND ROVER</h3>
      <hr>

      <p>Sold By: COSCHARIS MOTORS</p>
      <p class="btn-default"> ${randomPrice} </p>
      <button class="btn-primary">View AD </button>
      
    </div>
</div>

<div class="products">
  <div class="image-div"><img src="./images/benz.jpg" alt="" class="small-img"></div>
  <div class="ad-details">
    <h3>Mercedes</h3>
    <hr>

    <p>Sold By: BabaJerryMotors</p>
    <p class="btn-default"> ${randomPrice} </p>
    <button class="btn-primary">View AD </button>
    
  </div>
</div>

`
}, 1000)

 

}
filter.addEventListener('submit', filterSearch)