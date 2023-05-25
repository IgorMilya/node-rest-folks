import { BillsDAL } from './BillsDAL.js';
import { OrderDAL } from '../orders/OrdersDAL.js';

const create = async bill => {
    const noOrderID = ({ orderID, ...rest }) => rest;

    OrderDAL.deleteOrder(bill.orderID);

    const createdBill = await BillsDAL.create(noOrderID(bill));
    return createdBill;
};

const getAll = async ({ type, status }) => {
    let findType = {};

    if (!!type) {
        const arr = [];
        type.split(',').map(item => arr.push({ orderType: item }));
        findType = { $or: arr };
    }

    const findValue = { $and: [findType, !!status ? { status } : {}] };

    const bills = await BillsDAL.findAll(findValue);
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
