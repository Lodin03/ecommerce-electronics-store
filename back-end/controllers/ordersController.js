// Renamed getOrderById and updateOrderStatus service functions to avoid naming conflict with the controller function
const { getOrdersByUserId, getOrderById: getOrderByIdService, updateOrderStatus: updateOrderStatusService } = require('../services/orderService');
const { getOrderItemsByOrderId } = require('../services/orderItemService');


const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await getOrdersByUserId(userId);

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        status: 'error',
        statuscode: 404,
        data: { result: 'No orders found' }
      });
    }

    res.status(200).json({
      status: 'success',
      statuscode: 200,
      data: { result: orders }
    });
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({
      status: 'error',
      statuscode: 500,
      data: { result: 'Failed to get orders' }
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.id;

    const order = await getOrderByIdService(orderId);
    if (!order || order.userId !== userId) {
      return res.status(404).json({
        status: 'error',
        statuscode: 404,
        data: { result: 'Order not found' }
      });
    }

    const orderItems = await getOrderItemsByOrderId(orderId);
    res.status(200).json({
      status: 'success',
      statuscode: 200,
      data: {
        result: {
          order: order,
          orderItems: orderItems
        }
      }
    });

  } catch (error) {
    console.error('Error', error)
    res.status(500).json({
      status: 'error',
      statuscode: 500,
      data: { result: 'Failed to get order by id'}  
    })
  } 
}

const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id
    const { status } = req.body

    const order = await getOrderByIdService(orderId);
    if (!order) {
      return res.status(404).json({
        status: 'error',
        statuscode: 404,
        data: { result: 'Order not found' }
      });
    }

    // A status is by default In Progress, now an admin can update it to either "Ordered" or "Completed"
    const validStatuses = ['Ordered', 'Completed'];
    // Status input to be case-insensitive e.g. "ordered" or "ORDERED" becomes "Ordered"
    const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

    if (!validStatuses.includes(formattedStatus)) {
      return res.status(400).json({
        status: 'error',
        statuscode: 400,
        data: { result: 'Invalid status value' }
      });
    }

    await updateOrderStatusService(orderId, formattedStatus);

    res.status(200).json({
      status: 'success',
      statuscode: 200,
      data: { result: 'Order status was updated'}
    })
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({
      status: 'error',
      statuscode: 500,
      data: { result: 'Failed to update order'}
    })
  }
}

module.exports = { getOrders, getOrderById, updateOrderStatus }