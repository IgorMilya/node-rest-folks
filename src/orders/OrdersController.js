import { OrdersServiceCreate, OrdersServiceGetAll, OrdersServiceGetOne, OrdersServiceUpdate, OrdersServiceDelete } from './OrdersService.js';

export const OrdersControllerCreate = async (req, res) => {
    try {
        const order = await OrdersServiceCreate(req.body);
        res.json(order);
    } catch (e) {
        res.status(500).json(e.message);
    }
};

export const OrdersControllerGetAll = async (req, res) => {
    try {
        const orders = await OrdersServiceGetAll();
        return res.json(orders);
    } catch (e) {
        res.status(500).json(e.message);
    }
};
export const OrdersControllerGetOne = async (req, res) => {
    try {
        const order = await OrdersServiceGetOne(req.params.id);
        return res.json(order);
    } catch (e) {
        res.status(500).json(e.message);
    }
};

export const OrdersControllerUpdate = async (req, res) => {
    try {
        const updateOrder = await OrdersServiceUpdate(req.body);
        return res.json(updateOrder);
    } catch (e) {
        res.status(500).json(e.message);
    }
};
export const OrdersControllerDelete = async (req, res) => {
    try {
        const order = await OrdersServiceDelete(req.params.id);
        return res.json(order);
    } catch (e) {
        res.status(500).json(e.message);
    }
};
