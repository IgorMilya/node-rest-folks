import DishDB from './DishesDAL.js';

export const DishesServiceCreate = async dish => {
    const createdDish = await DishDB.create(dish);
    return createdDish;
};

export const DishesServiceGetAll = async () => {
    const dishes = await DishDB.find();
    return dishes;
};

export const DishesServiceGetByCategory = async category => {
    if (!category) {
        throw new Error('category was not set');
    }

    const dishes = await DishDB.find({ category });
    return dishes;
};

export const DishesServiceGetBySUBCategory = async (category, subcategory) => {
    if (!category) {
        throw new Error('category was not set');
    } else if (!subcategory) {
        throw new Error('subcategory was not set');
    }

    const dishes = await DishDB.find({ category, subcategory });
    return dishes;
};

export const DishesServiceGetOne = async id => {
    if (!id) {
        throw new Error('ID was not set');
    }
    const dish = await DishDB.findById(id);
    return dish;
};

export const DishesServiceUpdate = async dish => {
    if (!dish._id) {
        throw new Error('ID was not set');
    }
    const updatedDish = await DishDB.findByIdAndUpdate(dish._id, dish, { new: true });
    return updatedDish;
};

export const DishesServiceDelete = async id => {
    if (!id) {
        throw new Error('ID was not set');
    }
    const dish = await DishDB.findByIdAndDelete(id);
    return dish;
};
