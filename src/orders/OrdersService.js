import { OrderDAL } from './OrdersDAL.js';

const create = async order => {
    const createdOrder = await OrderDAL.create(order);
    return createdOrder;
};

const getAll = async () => {
    const orders = await OrderDAL.findAll();
    return orders;
};
const getOne = async id => {
    if (!id) {
        throw new Error('ID was not set');
    }
    const order = await OrderDAL.findByID(id);
    return order;
};

const update = async order => {
    if (!order.id) {
        throw new Error('ID was not set');
    }
    const updateOrder = await OrderDAL.update(order);
    return updateOrder;
};

const deleteOrder = async id => {
    if (!id) {
        throw new Error('ID was not set');
    }
    const order = await OrderDAL.deleteOrder(id);

    return order;
};

export const OrderService = {
    create,
    getAll,
    getOne,
    update,
    deleteOrder,
};
