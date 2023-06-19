import DeliveryDB from './DeliveryModel.js';

const create = async delivery => {
    return DeliveryDB.create(delivery);
};

const findAll = async ({ page, limit, findValue }) => {
    const totalCount = await DeliveryDB.countDocuments(findValue);
    const data = await DeliveryDB.find(findValue)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
    return { data, totalCount };
};

const findByID = async id => {
    return DeliveryDB.findById(id);
};

const update = async delivery => {
    return DeliveryDB.findByIdAndUpdate(delivery.id, delivery, { new: true });
};

const updateStatus = async id => {
    return DeliveryDB.findByIdAndUpdate(id, { status: 'closed' }, { new: true });
};

const deleteDelivery = async id => {
    return DeliveryDB.findByIdAndDelete(id);
};

export const DeliveryDAL = {
    create,
    findAll,
    findByID,
    update,
    updateStatus,
    deleteDelivery,
};
