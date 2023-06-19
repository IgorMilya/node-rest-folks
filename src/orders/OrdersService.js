import mongoose from 'mongoose';
import { OrderDAL } from './OrdersDAL.js';
import { findAdditionalFields } from './utils.js';

const create = async order => {
    const totalDishInfo = await findAdditionalFields(order);
    const createdOrder = await OrderDAL.create({
        ...order,
        dishes: totalDishInfo,
    });
    return createdOrder;
};

const getAll = async query => {
    if (query.orderType) {
        query.orderType = { $in: query.orderType?.split(',') };
    }

    const { page, limit, ...paramsQuery } = query;

    const findValue = { $and: [paramsQuery, { status: 'opened' }] };

    const orders = await OrderDAL.findAll({ page, limit, findValue });
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
    const totalDishInfo = await findAdditionalFields(order);

    const user = typeof order.user === 'string' ? order.user : new mongoose.Types.ObjectId(order.user.id);

    const updateOrder = await OrderDAL.update({
        ...order,
        user,
        dishes: totalDishInfo,
    });
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
