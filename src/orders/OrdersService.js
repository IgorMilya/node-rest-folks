import {
  createOrder,
  getOrdersALL,
  getOrderByID,
  getOrderByIDandUpdate,
  getOrderByIDandDelete,
} from './OrdersDAL.js'

export const OrdersServiceCreate = async order => {
  const createdOrder = await createOrder(order)
  return createdOrder
}

export const OrdersServiceGetAll = async () => {
  const orders = await getOrdersALL()
  return orders
}
export const OrdersServiceGetOne = async id => {
  if (!id) {
    throw new Error('ID was not set')
  }
  const order = await getOrderByID(id)
  return order
}

export const OrdersServiceUpdate = async order => {
  if (!order._id) {
    throw new Error('ID was not set')
  }
  const updateOrder = await getOrderByIDandUpdate(order)
  return updateOrder
}

export const OrdersServiceDelete = async id => {
  if (!id) {
    throw new Error('ID was not set')
  }
  const order = await getOrderByIDandDelete(id)
  return order
}
