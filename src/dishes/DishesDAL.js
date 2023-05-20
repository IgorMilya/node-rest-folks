import mongoose from 'mongoose';
import DishDB from './DishesModel.js';
import { getDishDATA } from './utils.js';

const create = async dish => {
    return DishDB.create(dish);
};

const findAll = async findValues => {
    return DishDB.aggregate([
        {
            $match: findValues,
        },
        ...getDishDATA,
    ]);
};

const findByID = async id => {
    const objectId = new mongoose.Types.ObjectId(id);

    return DishDB.aggregate([
        {
            $match: { _id: objectId },
        },
        ...getDishDATA,
    ]);
};

const update = async dish => {
    return DishDB.findByIdAndUpdate(dish.id, dish, { new: true });
};

const deleteDish = async id => {
    return DishDB.findByIdAndDelete(id);
};

export const DishesDAL = {
    create,
    findAll,
    findByID,
    update,
    deleteDish,
};
