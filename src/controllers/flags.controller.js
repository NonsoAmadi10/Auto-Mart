import pool from '../database/config';

class FlagController {

  static async postFlagController(req, res) {

    const { reason, carId, description } = req.body;
    const createdOn = new Date().toLocaleDateString();

    try {
      const carExist = await pool.query('SELECT * FROM cars WHERE id=$1;', [carId]);

      if (carExist.rowCount <= 0) return res.status(404).send({ status: 'error', error: 'Car not found' });
      const reportAd = await pool.query('INSERT INTO flags(car_id, reason, description, created_on) VALUES($1, $2, $3, $4) RETURNING * ;', [carId, reason, description, createdOn]);

      return res.status(201).send({
        status: 'success',
        data: reportAd.rows[0],
      });
    } catch (error) {
      return res.status(400).send({
        status: 'error',
        error: error.message,
      });
    }
  }
}

export default FlagController;
