import vehicles from '../utils/cars.db';

class VehicleAction {

  static postCar(data) {
    

    const newCarAd = {
      id: vehicles.cars.length,
      ...data,
    };

    vehicles.cars.push(newCarAd);
    return newCarAd;
  }
}

export default VehicleAction;