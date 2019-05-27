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

  static updatePrice(userId, orderId, newOffer) {
    
    const findOrder = orders.find((order => order.buyerId === userId && order.id === orderId));

    if (!findOrder) return false;

    const oldOffer = findOrder.offer;
    const orderIndex = orders.indexOf(findOrder);
    findOrder['offer'] = newOffer;
    findOrder['status'] = 'pending'
    const updateOrder = orders.splice(orderIndex, 1, findOrder);
    const newOrder = {
      id: findOrder.id,
      buyerId: findOrder.buyerId,
      carId: findOrder.carId,
      price: findOrder.price,
      createdOn: new Date().toLocaleString(),
      newOffer : findOrder.offer,
      status: findOrder.status,
      oldOffer,
    }

    return newOrder;

    
  }
}

export default OrderServices;
