import DishDB from './DishesModel.js';

export const createDish = async dish => {
    return DishDB.create(dish);
};

export const findDishALL = async () => {
    return DishDB.find();
};

export const findDisByID = async id => {
    return DishDB.findById(id);
};

export const findDisByIDandUpdate = async dish => {
    return DishDB.findByIdAndUpdate(dish._id, dish, { new: true });
};

export const findDisByIDandDelete = async id => {
    return DishDB.findByIdAndDelete(id);
};

export const findDishCategory = async category => {
    return DishDB.find({ category });
};

export const findCategory = async () => {
    return DishDB.find({}, 'category');
};

export const findDishSUBCategory = async ({ category, subcategory }) => {
    return DishDB.find({ category, subcategory });
};

export const findSUBCategory = async category => {
    return DishDB.find({ category }, 'subcategory');
};

export const findDisByString = async searchString => {
    return DishDB.find({ $or: [{ title: searchString }, { description: searchString }] });
};
