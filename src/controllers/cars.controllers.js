
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
    const createdOn = new Date().toLocaleString();
    const status = 'available';
    try {

      const postCarAd = await pool.query('INSERT INTO cars(ownerId, ownerEmail, createdon, state, status, price, manufacturer, model, body_type, image_url, flagged) VALUES($1, $2, $3, $4, $5, $6, $7, $8 , $9, $10, $11) RETURNING *;', [id, email, createdOn, state, status, price, manufacturer, model, bodyType, imageUrl, false]);

      return res.status(201).send({
        status: 'success',
        data: {
          id: postCarAd.rows[0].id,
          email: postCarAd.rows[0].ownerEmail
          createdOn: postCarAd.rows[0].createdon,
          state: postCarAd.rows[0].state,
          status: postCarAd.rows[0].status,
          manufacturer: postCarAd.rows[0].manufacturer,
          model: postCarAd.rows[0].model,
          bodyType: postCarAd.rows[0].body_type,
          price: postCarAd.rows[0].price,
          imageUrl: postCarAd.rows[0].image_url,
        },
      });

    } catch (error) {
      return res.status(400).send({
        status: 'error',
        error: error.message,
      });
    }
  }
}

export default CarAdvertController;