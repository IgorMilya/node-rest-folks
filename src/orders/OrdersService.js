import OrderDB from './OrdersDAL.js';

export const OrdersServiceCreate = async order => {
    const createOrder = await OrderDB.create(order);
    return createOrder;
};

export const OrdersServiceGetAll = async () => {
    const orders = await OrderDB.find();
    return orders;
};
export const OrdersServiceGetOne = async id => {
    if (!id) {
        throw new Error('ID was not set');
    }
    const order = await OrderDB.findById(id);
    return order;
};

export const OrdersServiceUpdate = async order => {
    if (!order._id) {
        throw new Error('ID was not set');
    }
    const updateOrder = await OrderDB.findByIdAndUpdate(order._id, order, { new: true });
    return updateOrder;
};

export const OrdersServiceDelete = async id => {
    if (!id) {
        throw new Error('ID was not set');
    }
    const order = await OrderDB.findByIdAndDelete(id);
    return order;
};
