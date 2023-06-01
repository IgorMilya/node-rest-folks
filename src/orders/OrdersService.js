import { OrderDAL } from './OrdersDAL.js';

const create = async order => {
    const createdOrder = await OrderDAL.create(order);
    return createdOrder;
};

const getAll = async query => {
    if (query.orderType) {
        query.orderType = { $in: query.orderType?.split(',') };
    }

    const { page, limit, ...paramsQuery } = query;

    const findValue = { $and: [paramsQuery, { status: 'opened' }] };

    const orders = await OrderDAL.findAll(findValue);
    return orders;
};

const getOne = async id => {
    if (!id) {
        throw new Error('ID was not set');
    }
    const [order] = await OrderDAL.findByID(id);
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
