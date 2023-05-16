import { createDish, findDishALL, findDisByID, findDisByIDandUpdate, findDisByIDandDelete } from './DishesDAL.js';

import { findOne } from '../categories/CategoriesDAL.js';

export const DishesServiceCreate = async dish => {
    const createdDish = await createDish(dish);
    return createdDish;
};

export const DishesServiceGetAll = async ({ q, category, subcategory }) => {
    console.log(await findOne(category, 'id'));
    const { _id: categoryID } = !!category && (await findOne(category, 'id'));
    const { _id: subcategoryID } = !!subcategory && (await findOne(subcategory, 'id'));

    const findValues = {
        ...(!!q && { $or: [{ title: new RegExp(q, 'i') }, { description: new RegExp(q, 'i') }] }),
        ...(!!category && { categoryID }),
        ...(!!subcategory && { subcategoryID }),
    };

    const dishes = await findDishALL(findValues);

    return dishes;
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
