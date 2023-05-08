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

// {
//     $lookup:
//       {
//         from: <collection to join>,
//         localField: <field from the input documents>,
//         foreignField: <field from the documents of the "from" collection>,
//         as: <output array field>
//       }
//  }
//  Query.prototype.find() - const arr = await Movie.find({ year: { $gte: 1980, $lte: 1989 } });
//  [filter] «Object|ObjectId» mongodb filter. If not specified, returns all documents.

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
