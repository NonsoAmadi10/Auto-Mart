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

  static async getUnsoldCars(available) {
    const availableCars = await vehicles.cars.filter((car => car.status === available));
    console.log(availableCars);
    if (!availableCars) return false;

    return availableCars;
  }
}

export default VehicleAction;
