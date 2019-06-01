import vehicleServices from '../services/cars.service';
import GetHelpers from '../middlewares/helpers';

const CarController = {

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
  },

  updateCarStatus(req, res) {
    const { email } = req.user;
    const { status } = req.body;
    const { id } = req.params;
    if (status !== 'sold') return res.status(400).send({ status: 'error', error: 'You Can only update a sold car' });
    const updateStatus = vehicleServices.patchStatus(email, parseInt(id, 10), status);

    if (!updateStatus) return res.status(404).send({ status: 'error', error: 'Car not found' });

    return res.status(200).send({
      status: 'success',
      data: updateStatus,
    });
  },

  updateCarPrice(req, res) {
    const { email } = req.user;
    const { price } = req.body;
    const { id } = req.params;

    const updatePrice = vehicleServices.patchPrice(email, parseInt(id, 10), price);

    if (!updatePrice) return res.status(404).send({ status: 'error', error: 'Car not found' });

    return res.status(200).send({
      status: 'success',
      data: updatePrice,
    });
  },

  async getSpecificCar(req, res) {
    const { email } = req.user;
    const { id } = req.params;

    const findCar = await vehicleServices.getSpecificCar(id, email);
    if (!findCar) return res.status(404).send({ status: 'error', error: 'Car not found' });

    return res.status(200).send({
      status: 'success',
      data: findCar,
    });
  },


  async getAll(req, res) {
    const { is_admin } = req.user;
    // eslint-disable-next-line no-return-await
    return is_admin == 't' ? await GetHelpers.getAllCars(res) : await GetHelpers.getAvailable(req, res);
  },

  async deleteCarAd(req, res) {
    const { id } = req.params;
    const {is_admin} = req.user;
    if (is_admin !== 't') return res.status(403).send({ status: 'error', error: 'you are not authorized to do this'})
    const deleteCar = await vehicleServices.deleteCarAd(id);

    if (deleteCar == -1 || !deleteCar) {return res.status(404).send({
      status: 'error',
      error: 'Advert not found',
    })};

    return res.status(200).send({
      status: 'success',
      data: 'Car Ad was successfully deleted',
    })
  },
};

export default CarController;
