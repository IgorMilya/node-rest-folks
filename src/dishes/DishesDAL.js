import DishDB from './DishesModel.js';
import CategoryDB from '../categories/CategoriesModel.js';

export const createDish = async dish => {
    return DishDB.create(dish);
};

export const findDishALL = async findValues => {
    return await DishDB.aggregate([
        {
            $match: findValues,
        },
    ]);
};

export const findDisByID = async id => {
    return DishDB.findById(id);
};

export const findDisByIDandUpdate = async dish => {
    return DishDB.findByIdAndUpdate(dish.id, dish, { new: true });
};

export const findDisByIDandDelete = async id => {
    return DishDB.findByIdAndDelete(id);
};
