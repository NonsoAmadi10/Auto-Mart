import cars from '../utils/cars.db';
import flags from '../utils/flags.db';

const postFlag = (params) => {
  const { carId } = params;
  /*
 @property carId- Search through if car exists before posting a report
 */

  const findCar = cars.cars.find((car => car.id == carId));
  if (!findCar) return false;

  const newflag = {
    id: cars.cars.length,
    ...params,
  };

  flags.push(newflag);
  return newflag;

};

export default postFlag;