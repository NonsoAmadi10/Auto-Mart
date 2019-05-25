import cars from '../utils/cars.db';
import orders from '../utils/ordersdb';

class OrderServices {

  static postOrder(order) {
    const findCar = cars.cars.find((car => car.id === order.carId));
    if (!findCar) return false;
    const newOrder = {
      id: orders.length,
      buyerId: order.buyerId,
      carId: findCar.id,
      price: findCar.price,
      offer: order.offer,
      status: order.status,
      createdOn: new Date().toTimeString(),
    };

    orders.push(newOrder);
    return newOrder;
  }
}

export default OrderServices;
