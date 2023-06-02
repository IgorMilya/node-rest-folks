import OrderDB from './OrdersModel.js';

const create = async order => {
    return OrderDB.create(order);
};

const findAll = async ({ page, limit, findValue }) => {
    return OrderDB.find(findValue)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
};

const findByID = async id => {
    return OrderDB.findById(id);
};

const update = async order => {
    return OrderDB.findByIdAndUpdate(order.id, order, { new: true });
};

const updateStatus = async id => {
    return OrderDB.findByIdAndUpdate(id, { status: 'closed' }, { new: true });
};

const deleteOrder = async id => {
    return OrderDB.findByIdAndDelete(id);
};

export const OrderDAL = {
    create,
    findAll,
    findByID,
    update,
    updateStatus,
    deleteOrder,
};
