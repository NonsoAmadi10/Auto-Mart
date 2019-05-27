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

  static patchStatus(userEmail, carId, status) {
    const findCar = vehicles.cars.find((car => car.email == userEmail && car.id == carId));
    if (!findCar) return false;
    const carIndex = vehicles.cars.indexOf(findCar);
    findCar.status = status;
    vehicles.cars.splice(carIndex, 1, findCar);
    return findCar;

  }
}

export default VehicleAction;
