import { DeliveryDAL } from './DeliveryDAL.js';

const create = async delivery => {
    const createdDelivery = await DeliveryDAL.create(delivery);
    return createdDelivery;
};

const getAll = async query => {
    // if (query.orderType) {
    //     query.orderType = { $in: query.orderType?.split(',') };
    // }

    // const { page, limit, ...paramsQuery } = query;

    // const findValue = { $and: [paramsQuery] };

    const deliveries = await DeliveryDAL.findAll({ page, limit, findValue });
    return deliveries;
};

const getOne = async id => {
    if (!id) {
        throw new Error('ID was not set');
    }
    const delivery = await DeliveryDAL.findByID(id);
    return delivery;
};

const update = async delivery => {
    if (!delivery.id) {
        throw new Error('ID was not set');
    }

    const updateDelivery = await DeliveryDAL.update(delivery);
    return updateDelivery;
};

const deleteDelivery = async id => {
    if (!id) {
        throw new Error('ID was not set');
    }
    const delivery = await DeliveryDAL.deleteDelivery(id);

    return delivery;
};

export const DeliveryService = {
    create,
    getAll,
    getOne,
    update,
    deleteDelivery,
};
