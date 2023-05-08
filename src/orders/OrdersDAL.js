import OrderDB from './OrdersModel.js';
import DishesDB from '../dishes/DishesModel.js';

export const createOrder = async order => {
    return OrderDB.create(order);
};

export const getOrdersALL = async () => {
    return OrderDB.aggregate([
        {
            $lookup: {
                from: 'dishes',
                localField: 'dish_id',
                foreignField: '_id',
                as: 'dishes',
            },
            // $project: {
            //     'dishes._id': 1,
            //     'dishes.title': 1,
            // },
        },
    ]);

    // return OrderDB.find();
};

export const getOrderByID = async id => {
    return OrderDB.findById(id);
};

export const getOrderByIDandUpdate = async order => {
    return OrderDB.findByIdAndUpdate(order._id, order, { new: true });
};

export const getOrderByIDandDelete = async id => {
    return OrderDB.findByIdAndDelete(id);
};
