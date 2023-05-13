import {
    createDish,
    findDishALL,
    findDishCategory,
    findCategory,
    findDishSUBCategory,
    findSUBCategory,
    findDisByID,
    findDisByIDandUpdate,
    findDisByIDandDelete,
    findDisByString,
} from './DishesDAL.js';

import { findOne } from '../categories/CategoriesDAL.js';

export const DishesServiceCreate = async dish => {
    const createdDish = await createDish(dish);
    return createdDish;
};

export const DishesServiceGetAll = async () => {
    const dishes = await findDishALL();
    return dishes;
};

export const DishesServiceGetByCategory = async category => {
    if (!category) {
        throw new Error('category was not set');
    }

    const dishes = await findDishCategory(category);
    return dishes;
};

export const DishesServiceGetCategories = async () => {
    const categoriesAll = await findCategory();
    const SetCategories = [];
    categoriesAll.forEach(item => {
        SetCategories.push(item.category);
    });

    const categories = Array.from(new Set(SetCategories));

    const result = await Promise.all(
        categories.map(async item => {
            const category = await findOne(item);

            return { category: item, picture: category?.picture || 'not set' };
        })
    );

    return result;
};

export const DishesServiceGetBySUBCategory = async (category, subcategory) => {
    if (!category) {
        throw new Error('category was not set');
    } else if (!subcategory) {
        throw new Error('subcategory was not set');
    }

    const dishes = await findDishSUBCategory({ category, subcategory });
    return dishes;
};

export const DishesServiceGetSUBCategories = async category => {
    if (!category) {
        throw new Error('category was not set');
    }
    const subcategories = await findSUBCategory(category);
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
    const dish = await findDisByID(id);
    return dish;
};

export const DishesServiceUpdate = async dish => {
    if (!dish.id) {
        throw new Error('ID was not set');
    }
    const updatedDish = await findDisByIDandUpdate(dish);
    return updatedDish;
};

export const DishesServiceDelete = async id => {
    if (!id) {
        throw new Error('ID was not set');
    }
    const dish = await findDisByIDandDelete(id);
    return dish;
};

export const DishesServiceSearch = async q => {
    if (!q) {
        throw new Error('String isn`t correct');
    }
    const searchString = new RegExp(q, 'i');
    const dish = await findDisByString(searchString);
    return dish;
};
