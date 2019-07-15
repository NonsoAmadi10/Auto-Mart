/* eslint-disable camelcase */

import pool from '../database/config';
import GetHelpers from '../middlewares/helpers';

/**
 *@car advert controller- controls all endpoint concerning the car adverts going to be used by users of this application
 */

class CarAdvertController {
  static async postAdvert(req, res) {
    // Get the id of the user from the previous middleware
    const { id, email } = req.user;
    const {
      manufacturer, model, state, price, body_type,
    } = req.body;

    const imageUrl = 'https://cloudinary.com/bbcusdbcudbuebcub.jpg'
    const Floatprice = parseFloat(price).toFixed(2);
    const createdOn = new Date().toLocaleString();
    const status = 'available';
    try {
      const postCarAd = await pool.query('INSERT INTO cars(owner_id, owner_email, created_on, state, status, price, manufacturer, model, body_type, image_url, flagged) VALUES($1, $2, $3, $4, $5, $6, $7, $8 , $9, $10, $11) RETURNING *;', [id, email, createdOn, state, status, Floatprice, manufacturer, model, body_type, imageUrl, false]);

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

      const advertExist = await pool.query('SELECT * FROM cars WHERE id=$1 AND owner_email=$2;', [id, email]);
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
      const advertExist = await pool.query('SELECT * FROM cars WHERE id=$1 AND owner_email=$2;', [id, email]);
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
  static getCarsController(req, res) {
    // eslint-disable-next-line camelcase
    

    // eslint-disable-next-line camelcase
    return GetHelpers.getAllCars(res)


  }

  // eslint-disable-next-line consistent-return
  static async deleteCarController(req, res) {
    //const { is_admin } = req.user;
    const { id } = req.params;
    /*if (is_admin !== 't') {
      return res.status(403).send({
        status: 'error',
        error: 'you are not authorized to do this',
      });
    } */

    try {

      const findCar = await pool.query('SELECT * FROM cars WHERE id=$1;', [id]);

      if (findCar.rowCount <= 0) {
        return res.status(404).send({
          status: 'error',
          error: 'Advert not found',
        });
      }

      await pool.query('DELETE FROM cars WHERE id=$1;', [id]);

      return res.status(200).send({
        status: 'success',
        data: 'Car Ad was successfully deleted',
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
