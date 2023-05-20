import OrderDB from './OrdersModel.js';

const create = async order => {
    return OrderDB.create(order);
};

const findAll = async () => {
    return OrderDB.find();
};

const findByID = async id => {
    return OrderDB.findById(id);
};

const update = async order => {
    return OrderDB.findByIdAndUpdate(order.id, order, { new: true });
};

const deleteOrder = async id => {
    return OrderDB.findByIdAndDelete(id);
};

export const OrderDAL = {
    create,
    findAll,
    findByID,
    update,
    deleteOrder,
};
