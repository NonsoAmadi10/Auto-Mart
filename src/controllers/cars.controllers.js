import vehicleServices from '../services/cars.service';

const CarController =  {

   async postAd(req, res) {
    const { email } = req.user;
    
    const {
      model, manufacturer, bodyType, price, state, imageUrl,
    } = req.body;
    
    
    const newAd = {
      email,
      createdOn: new Date().toLocaleString(),
      model,
      manufacturer,
      bodyType,
      price: parseInt(price).toFixed(2),
      status: 'available',
      state,
      imageUrl,
    };

    const addCar = await vehicleServices.postCar(newAd);

    return res.status(201).send({
      status: 'success',
      data: addCar,
    });
  }
}

export default CarController;
