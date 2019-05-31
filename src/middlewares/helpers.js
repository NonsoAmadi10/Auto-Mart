import vehicleServices from '../services/cars.service';
class GetHelpers {

  static async getAvailable(req, res) {

    const { status } = req.query;
    if (status == undefined) {
      return res.status(403).send({
        status: 'error',
        error: 'only admins can access this route',
      })
      ;
    }

    const filterSearch = await vehicleServices.getAvailableCars(req.query);
    if (filterSearch.length < 1) return res.status(404).send({ status: 'error', error: 'No match found' });

    return res.status(200).send({
      status: 'success',
      data: filterSearch,
    });
  }

  static async getAllCars(res) {
    const allCar = await vehicleServices.getAllCars();
    return res.status(200).send({
      status: 'success',
      data: allCar,
    });
  }
}

export default GetHelpers;
