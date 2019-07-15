import pool from '../database/config';

class OrderController {

  static async postOrder(req, res) {
    const { id } = req.user;
    const  { car_id, amount } = req.body;
    const price = Number(amount).toFixed(2);
    const status = 'pending';
    try {
      /**
    * search if the car exist
    */

      const carExist = await pool.query('SELECT id, price FROM cars WHERE id=$1; ', [car_id]);

      if (carExist.rowCount <= 0) {
        return res.status(404).send({
          status: 'error',
          error: 'Car does not exist',
        });
      }

      const createdOn = new Date().toLocaleDateString();

      const makeOrder = await pool.query('INSERT into orders(car_id, buyer_id, created_on ,amount, status) VALUES($1, $2, $3, $4, $5) RETURNING * ;', [carId, id, createdOn, price, status]);

      return res.status(201).send({
        status: 'success',
        data: {
          id: makeOrder.rows[0].id,
          buyer_id: makeOrder.rows[0].buyer_id,
          car_id: makeOrder.rows[0].car_id,
          created_on: makeOrder.rows[0].created_on,
          price: parseFloat(carExist.rows[0].price).toFixed(2),
          price_offered: makeOrder.rows[0].amount,
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

  static async updatePriceOrder(req, res) {
    const orderId = req.params.id;
    const { price } = req.body;
    const { id } = req.user;

    try {
      const checkUserOrder = await pool.query('SELECT * FROM orders WHERE buyer_id=$1 AND id=$2;', [id, orderId]);

      if (checkUserOrder.rowCount <= 0) {
        return res.status(404).send({
          status: 'error',
          error: 'Order not found',
        });
      }

      const updateOrderPrice = await pool.query('UPDATE orders SET amount=$1 WHERE id=$2 RETURNING *;', [price, checkUserOrder.rows[0].id]);
      return res.status(200).send({
        status: 'success',
        data: {
          id: updateOrderPrice.rows[0].id,
          car_id: updateOrderPrice.rows[0].car_id,
          status: updateOrderPrice.rows[0].status,
          old_offer: checkUserOrder.rows[0].amount,
          new_offer: updateOrderPrice.rows[0].amount,
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
