import DishDB from './DishesDAL.js';

export const DishesServiceCreate = async dish => {
    const createdDish = await DishDB.create(dish);
    return createdDish;
};

export const DishesServiceGetAll = async () => {
    const dishes = await DishDB.find();
    return dishes;
};
export const DishesServiceGetOne = async id => {
    if (!id) {
        throw new Error('не указан ID');
    }
    const dish = await DishDB.findById(id);
    return dish;
};

export const DishesServiceUpdate = async dish => {
    if (!dish._id) {
        throw new Error('не указан ID');
    }
    const updatedDish = await DishDB.findByIdAndUpdate(dish._id, dish, { new: true });
    return updatedDish;
};

export const DishesServiceDelete = async id => {
    if (!id) {
        throw new Error('не указан ID');
    }
    const dish = await DishDB.findByIdAndDelete(id);
    return dish;
};
