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

export const DishesServiceGetCategories = async () => {
    const categories = await DishDB.find({}, 'category');
    const SetCategories = [];
    categories.forEach(item => {
        SetCategories.push(item.category);
    });

    return Array.from(new Set(SetCategories));
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

export const DishesServiceGetSUBCategories = async category => {
    if (!category) {
        throw new Error('category was not set');
    }
    const subcategories = await DishDB.find({ category }, 'subcategory');
    const SetSUBCategories = [];
    subcategories.forEach(item => {
        SetSUBCategories.push(item.subcategory);
    });

    return Array.from(new Set(SetSUBCategories));
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
