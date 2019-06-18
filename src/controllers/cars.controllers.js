
import pool from '../database/config';

/**
 *@car advert controller- controls all endpoint concerning the car adverts going to be used by users of this application
 */

class CarAdvertController {

  static async postAdvert(req, res) {

    // Get the id of the user from the previous middleware
    const { id, email } = req.user;
    const {
 manufacturer, model, state, price, bodyType, imageUrl 
} = req.body;
    const Floatprice = parseFloat(price).toFixed(2);
    const createdOn = new Date().toLocaleString();
    const status = 'available';
    try {

      const postCarAd = await pool.query('INSERT INTO cars(ownerId, ownerEmail, createdon, state, status, price, manufacturer, model, body_type, image_url, flagged) VALUES($1, $2, $3, $4, $5, $6, $7, $8 , $9, $10, $11) RETURNING *;', [id, email, createdOn, state, status, Floatprice, manufacturer, model, bodyType, imageUrl, false]);

      return res.status(201).send({
        status: 'success',
        data: postCarAd.rows[0]
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

      const advertExist =  await pool.query('SELECT * FROM cars WHERE id=$1 AND ownerEmail=$2;',[id, email]);
      if (advertExist.rowCount <= 0) {
        res.status(404).send({
          status: 'error',
          error: 'Car not found'
        })
      }

      const updateStatus = await pool.query('UPDATE cars SET status=$1 WHERE id=$2 RETURNING * ;',[status, advertExist.rows[0].id]);
      return res.status(200).send({
        status: 'success',
        data: updateStatus.rows[0]
      })
    } catch (error) {
      return res.status(500).send({
        status: 'error',
        error: error.message,
      })
    }
  }
}

export default CarAdvertController;