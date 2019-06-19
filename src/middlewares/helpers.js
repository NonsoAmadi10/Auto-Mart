import pool from '../database/config';

class GetHelpers {

  static async getAvailableCarControllers(req, res) {
    const {
      status,

      min_price: minPrice = 0,
      max_price: maxPrice = 72000000000000,

    } = req.query;


    try {
      if (status == undefined) {
        return res.status(403).send({
          status: 'error',
          error: 'only admins can access this route',
        })
        ;
      }

      if (status !== 'available') return res.status(422).send({
        status: 'error',
        error: 'You Cannot do that '
      })
      const getAvailableCar = await pool.query('SELECT * FROM cars WHERE status=$1 AND (price >= $2 AND price <= $3);', ['available', minPrice, maxPrice]);

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

  static async getAllCars(res) {
    try {
      const getCars = await pool.query('SELECT * FROM CARS ;');

      return res.status(200).send({
        status: 'success',
        data: getCars.rows,
      });
    } catch (error) {
      return res.status(500).send({
        status: 'error',
        error: error.message,
      });
    }
  }
}

export default GetHelpers;
