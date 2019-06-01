/* eslint-disable space-before-blocks */
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

  static patchPrice(userEmail, carId, price) {
    const findCar = vehicles.cars.find((car => car.email == userEmail && car.id == carId));
    if (!findCar) return false;
    const carIndex = vehicles.cars.indexOf(findCar);
    findCar.price = price;
    vehicles.cars.splice(carIndex, 1, findCar);
    return findCar;

  }

  static async getSpecificCar(carId, userEmail) {
    const specificCar = await vehicles.cars.find((car => car.id == carId && car.email == userEmail));
    if (!specificCar) return false;

    return specificCar;
  }

  static async getAvailableCars(queries) {

    // Get queries from controllers, set default value for the price range
    // so that if not specified in the queries, it would still return a valid response
    const {
      min_price: minPrice = 0,
      max_price: maxPrice = Infinity,
    } = queries;
    const availableCars = await vehicles.cars.filter((car => car.status === 'available' && car.price >= minPrice && car.price <= maxPrice));
    if (!availableCars) return false;

    return availableCars;
  }

  static getAllCars() {
    return vehicles.cars;
  }

  static deleteCarAd(id){
    const findCar = vehicles.cars.findIndex((car => car.id == id));

    if(findCar === -1) return false;

    return vehicles.cars.splice(findCar, 1);
  }
}

export default VehicleAction;
