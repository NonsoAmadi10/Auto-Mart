import pool from '../database/config';

class OrderController {

  static async postOrder(req, res) {
    const { id } = req.user;
    const { carId, priceOffered } = req.body;
    const price = parseFloat(priceOffered).toFixed(2);
    const status = 'pending';
    try {
      /**
    * search if the car exist
    */

      const carExist = await pool.query('SELECT id, price FROM cars WHERE id=$1; ', [carId]);

      if (carExist.rowCount <= 0) {
        return res.status(404).send({
          status: 'error',
          error: 'Car does not exist',
        });
      }

      const createdOn = new Date().toLocaleDateString();

      const makeOrder = await pool.query('INSERT into orders(car_id, buyer_id, createdon ,amount, status) VALUES($1, $2, $3, $4, $5) RETURNING * ;', [carId, id, createdOn, price, status]);

      return res.status(201).send({
        status: 'success',
        data: {
          id: makeOrder.rows[0].id,
          buyerId: makeOrder.rows[0].buyer_id,
          createdOn: makeOrder.rows[0].createdon,
          price: parseFloat(carExist.rows[0].price).toFixed(2),
          priceOffered: parseFloat(makeOrder.rows[0].amountOffered).toFixed(2),
          status: makeOrder.rows[0].status,
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

export default OrderController;
