import orderServices from '../services/orders.service';

class OrderController {

  static postOrder(req, res) {
    const { id } = req.user;
    const { carId, offer } = req.body;
    const data = {
      buyerId: id,
      carId,
      offer: parseFloat(offer).toFixed(2),
      status: 'pending',
    };

    const addOrder = orderServices.postOrder(data);

    if (!addOrder) {
      return res.status(404).send({
        status: 'error',
        error: 'Car does not exist',
      });
    }

    return res.status(201).send({
      status: 'success',
      data: addOrder,
    });
  }

  static patchOrderPrice(req, res) {
    
    const userId = req.user.id;
    const { id } = req.params;
    
   const { newOffer } = req.body;

   const updateOrder = orderServices.updatePrice(userId, parseInt(id) , newOffer);
   
   if(!updateOrder) {
     return res.status(404).send({
       status: 'error',
       error: 'Order not found'
     })
   }

   return res.status(200).send({
     status: 'success',
     data: updateOrder,
   })
  }
}

export default OrderController;