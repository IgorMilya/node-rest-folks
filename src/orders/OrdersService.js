import { OrderDAL } from './OrdersDAL.js';
import { DishesDAL } from '../dishes/DishesDAL.js';

const create = async order => {
    const { dishes } = order;
    const totalDishInfo = await Promise.all(
        dishes.map(async item => {
            console.log(item);
            //const { title, price, picture }
            const a = await DishesDAL.findByID(item.dishID);
            //const dishTotalPrice = item.amount * price;
            console.log(a);
            return { ...item, dishTotalPrice, title, price, picture };
        })
    );

    const createdOrder = await OrderDAL.create({ ...order, dishes: totalDishInfo });
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
