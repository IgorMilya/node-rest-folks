import DeliveryDB from './DeliveryModel.js';

const create = async delivery => {
    return DeliveryDB.create(delivery);
};

const findAll = async ({ page, limit }) => {
    const totalCount = await DeliveryDB.countDocuments();

    const data = await DeliveryDB.find()
        .sort({ statusPriority: 1, createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .select('-statusPriority')
        .populate('courier', 'firstName secondName')
        .populate('order', 'dishes description orderNumber');
    return { data, totalCount };
};

const findByID = async id => {
    return DeliveryDB.findById(id).select('-statusPriority').populate('courier', 'firstName secondName').populate('order', 'dishes description orderNumber');
};

const update = async delivery => {
    return DeliveryDB.findByIdAndUpdate(delivery.id, delivery, { new: true });
};

const deleteDelivery = async id => {
    return DeliveryDB.findByIdAndDelete(id);
};

export const DeliveryDAL = {
    create,
    findAll,
    findByID,
    update,
    deleteDelivery,
};
