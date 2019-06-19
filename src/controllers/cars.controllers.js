
import pool from '../database/config';

/**
 *@car advert controller- controls all endpoint concerning the car adverts going to be used by users of this application
 */

class CarAdvertController {
  static async postAdvert(req, res) {
    // Get the id of the user from the previous middleware
    const { id, email } = req.user;
    const {
      manufacturer, model, state, price, bodyType, imageUrl,
    } = req.body;
    const Floatprice = parseFloat(price).toFixed(2);
    const createdOn = new Date().toLocaleString();
    const status = 'available';
    try {
      const postCarAd = await pool.query('INSERT INTO cars(ownerId, ownerEmail, createdon, state, status, price, manufacturer, model, body_type, image_url, flagged) VALUES($1, $2, $3, $4, $5, $6, $7, $8 , $9, $10, $11) RETURNING *;', [id, email, createdOn, state, status, Floatprice, manufacturer, model, bodyType, imageUrl, false]);

      return res.status(201).send({
        status: 'success',
        data: postCarAd.rows[0],
      });
    } catch (error) {
      return res.status(400).send({
        status: 'error',
        error: error.message,
      });
    }
  }

  static async updateCarStatusController(req, res) {
    const { id } = req.params;
    const { email } = req.user;
    const { status } = req.body;

    try {
      /**
      * check to see if the advert belongs to the user
      */

      const advertExist = await pool.query('SELECT * FROM cars WHERE id=$1 AND ownerEmail=$2;', [id, email]);
      if (advertExist.rowCount <= 0) {
        res.status(404).send({
          status: 'error',
          error: 'Car not found',
        });
      }

      const updateStatus = await pool.query('UPDATE cars SET status=$1 WHERE id=$2 RETURNING * ;', [status, advertExist.rows[0].id]);
      return res.status(200).send({
        status: 'success',
        data: updateStatus.rows[0],
      });
    } catch (error) {
      return res.status(500).send({
        status: 'error',
        error: error.message,
      });
    }
  }

  static async UpdateCarPriceController(req, res) {
    const { id } = req.params;
    const { email } = req.user;
    const { price } = req.body;

    try {
      const advertExist = await pool.query('SELECT * FROM cars WHERE id=$1 AND ownerEmail=$2;', [id, email]);
      if (advertExist.rowCount <= 0) {
        res.status(404).send({
          status: 'error',
          error: 'Car not found',
        });
      }
      const updatePrice = await pool.query('UPDATE cars SET price=$1 WHERE id=$2 RETURNING * ;', [Number(price).toFixed(2), advertExist.rows[0].id]);
      return res.status(200).send({
        status: 'success',
        data: updatePrice.rows[0],
      });
    } catch (error) {
      return res.status(500).send({
        status: 'error',
        error: error.message,
      });
    }
  }

  static async getSpecificCarController(req, res) {
    const { id } = req.params;

    try {
      const getCar = await pool.query('SELECT * FROM cars WHERE id=$1;', [id]);

      if (getCar.rowCount <= 0) return res.status(404).send({ status: 'error', error: 'Car not found' });

      return res.status(200).send({
        status: 'success',
        data: getCar.rows[0],
      });
    } catch (error) {
      return res.status(500).send({
        status: 'error',
        error: error.message,
      });
    }

  }


  // eslint-disable-next-line consistent-return
  static async getAvailableCarControllers(req, res) {
    const { status } = req.query;
    

    try {
      if (status == undefined) {
        return res.status(403).send({
          status: 'error',
          error: 'only admins can access this route',
        })
        ;
      }
      const getAvailableCar = await pool.query('SELECT * FROM cars WHERE status=$1;', ['available']);

      if (getAvailableCar.rowCount <= 0) {
        res.status(404).send({
          status: 'error',
          error: 'No match found',
        });
      }

      return res.status(200).send({
        status: 'success',
        data: getAvailableCar.rows,
      });
    } catch (error) {
      res.status(500).send({
        status: 'error',
        error: error.message,
      });
    }

  }
}

export default CarAdvertController;
