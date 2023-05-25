import BillDB from './BillsModel.js';

const create = async bill => {
    return BillDB.create(bill);
};

const findAll = async findValue => {
    return BillDB.find(findValue);
};

const findByID = async id => {
    return BillDB.findById(id);
};

const update = async bill => {
    return BillDB.findByIdAndUpdate(bill.id, bill, { new: true });
};

const deleteOrder = async id => {
    return BillDB.findByIdAndDelete(id);
};

export const BillsDAL = {
    create,
    findAll,
    findByID,
    update,
    deleteOrder,
};
