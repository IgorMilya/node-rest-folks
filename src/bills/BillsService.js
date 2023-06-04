import { BillsDAL } from './BillsDAL.js';
import { OrderDAL } from '../orders/OrdersDAL.js';
import { sendEmail } from '../mail/MailService.js';
import { checkTotalPrice } from './utils.js';

const create = async bill => {
    OrderDAL.updateStatus(bill.orderID);

    const { dishes } = await OrderDAL.findByID(bill.orderID);
    checkTotalPrice({ dishes, totalPrice: bill.totalPrice });

    const createdBill = await BillsDAL.create(bill);
    return createdBill;
};

const getAll = async query => {
    if (query.orderType) {
        query.orderType = { $in: query.orderType?.split(',') };
    }

    const { page, limit, ...paramsQuery } = query;

    const findValue = { $and: [paramsQuery] };

    const bills = await BillsDAL.findAll({ page, limit, findValue });
    return bills;
};

const getOne = async id => {
    if (!id) {
        throw new Error('ID was not set');
    }
    const [bill] = await BillsDAL.findByID(id);
    return bill;
};

const update = async bill => {
    if (!bill.id) {
        throw new Error('ID was not set');
    }

    checkTotalPrice({ ...bill });

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

const sendBill = async id => {
    if (!id) {
        throw new Error('ID was not set');
    }
    const [{ email, dishes, totalPrice, orderNumber }] = await BillsDAL.findByID(id);

    sendEmail({ email, dishes, totalPrice, orderNumber });
    return email;
};

export const BillsService = {
    create,
    getAll,
    getOne,
    update,
    deleteBill,
    sendBill,
};
