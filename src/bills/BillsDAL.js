import mongoose from 'mongoose';
import BillDB from './BillsModel.js';
import { getBillsDATA } from './utils.js';

const create = async bill => {
    return BillDB.create(bill);
};

const findAll = async findValue => {
    return BillDB.aggregate([
        ...getBillsDATA,
        {
            $match: findValue,
        },
        {
            $sort: { createdAt: -1 },
        },
    ]);
};

const findByID = async id => {
    const objectId = new mongoose.Types.ObjectId(id);

    return BillDB.aggregate([
        {
            $match: { _id: objectId },
        },
        ...getBillsDATA,
    ]);
};

const update = async bill => {
    return BillDB.findByIdAndUpdate(bill.id, bill, { new: true });
};

const deleteBill = async id => {
    return BillDB.findByIdAndDelete(id);
};

const findEmail = async id => {
    const { email } = await BillDB.findById(id);
    return email;
};

export const BillsDAL = {
    create,
    findAll,
    findByID,
    update,
    deleteBill,
    findEmail,
};
