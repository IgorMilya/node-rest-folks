import { BillsDAL } from './BillsDAL.js';

const create = async bill => {
    const createdBill = await BillsDAL.create(bill);
    return createdBill;
};

const getAll = async () => {
    const bills = await BillsDAL.findAll();
    return bills;
};

const getOne = async id => {
    if (!id) {
        throw new Error('ID was not set');
    }
    const bill = await BillsDAL.findByID(id);
    return bill;
};

const update = async bill => {
    if (!bill.id) {
        throw new Error('ID was not set');
    }
    const updateBill = await BillsDAL.update(bill);
    return updateBill;
};

const deleteBill = async id => {
    if (!id) {
        throw new Error('ID was not set');
    }
    const bill = await BillsDAL.deleteBill(id);

    return bill;
};

export const BillsService = {
    create,
    getAll,
    getOne,
    update,
    deleteBill,
};
