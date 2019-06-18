import pool from '../database/config';

class OrderController {

  static async postOrder(req, res) {
    const { id } = req.user;
    const { carId, priceOffered } = req.body;
    const price = Number(priceOffered).toFixed(2);
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

      const makeOrder = await pool.query('INSERT into orders(car_id, buyer_id, createdon ,amountOffered, status) VALUES($1, $2, $3, $4, $5) RETURNING * ;', [carId, id, createdOn, price, status]);

      return res.status(201).send({
        status: 'success',
        data: {
          id: makeOrder.rows[0].id,
          buyerId: makeOrder.rows[0].buyer_id,
          carId,
          createdOn: makeOrder.rows[0].createdon,
          price: parseFloat(carExist.rows[0].price).toFixed(2),
          priceOffered: makeOrder.rows[0].amountoffered,
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
    const { id } = req.params;
    const { newOffer } = req.body;
    const userId = req.user.id;

    try {
      const checkUserOrder = await pool.query('SELECT * FROM orders WHERE buyer_id=$1 AND id=$1;', [userId, id]);

      if (checkUserOrder.rowCount <= 0) {
        return res.status(404).send({
          status: 'error',
          error: 'Order not found',
        });
      }

      const updateOrderPrice = await pool.query('UPDATE orders SET amountoffered=$1 and status=$2 WHERE id=$3 AND buyer_id=$4 RETURNING *;', [newOffer, 'pending', id, userId]);
      return res.status(200).send({
        status: 'success',
        data: {
          id: updateOrderPrice.rows[0].id,
          carId: updateOrderPrice.rows[0].car_id,
          status: updateOrderPrice.rows[0].status,
          oldOffer: checkUserOrder.rows[0].amountoffered,
          newOffer: updateOrderPrice.rows[0].amountoffered,
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
