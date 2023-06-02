import mongoose from 'mongoose';
import BillDB from './BillsModel.js';
import { getBillsDATA } from './utils.js';

const create = async bill => {
    return BillDB.create(bill);
};

const findAll = async ({ page, limit, findValue }) => {
    return BillDB.aggregate([
        ...getBillsDATA,
        {
            $match: findValue,
        },
        {
            $sort: { createdAt: -1 },
        },
        {
            $skip: (page - 1) * limit || 0,
        },
        {
            $limit: Number(limit || 20),
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

export const BillsDAL = {
    create,
    findAll,
    findByID,
    update,
    deleteBill,
};
