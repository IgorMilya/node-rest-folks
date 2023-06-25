import { DeliveryDAL } from './DeliveryDAL.js';
import { sendDEliveredMsg } from '../bot/telegramBot.js';
import { createError } from '../utils/error.js';

const create = async delivery => {
    const createdDelivery = await DeliveryDAL.create(delivery);
    return createdDelivery;
};

const getAll = async query => {
    const { page, limit } = query;

    const deliveries = await DeliveryDAL.findAll({ page, limit });
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

const sendMsg = async id => {
    if (!id) {
        throw new Error('ID was not set');
    }
    const { clientInfo } = await DeliveryDAL.findByID(id);
    const { phoneNumber, name } = clientInfo;

    if (!phoneNumber) {
        throw new Error('phoneNumber was not added');
    }

    try {
        await sendDEliveredMsg({ phoneNumber, name });
        return phoneNumber;
    } catch (error) {
        if (!!error.statusCode) {
            throw createError(error.message, error.statusCode);
        }
        throw new Error(error.message);
    }
};

export const DeliveryService = {
    create,
    getAll,
    getOne,
    update,
    deleteDelivery,
    sendMsg,
};
