import vehicleServices from '../services/cars.service';

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
    const updateStatus = vehicleServices.patchStatus(email, parseInt(id,10), status);

    if (!updateStatus) return res.status(404).send({ status: 'error', error: 'Car not found' });

    return res.status(200).send({
      status: 'success',
      data: updateStatus,
    });
  },
};

export default CarController;
