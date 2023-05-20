import { DishesDAL } from './DishesDAL.js';

import { CategoryDAL } from '../categories/CategoriesDAL.js';

const create = async dish => {
    const createdDish = await DishesDAL.create(dish);
    return createdDish;
};

const getAll = async ({ q, category, subcategory }) => {
    const { _id: categoryID } = !!category && (await CategoryDAL.findOne(category, 'id'));
    const { _id: subcategoryID } = !!subcategory && (await CategoryDAL.findOne(subcategory, 'id'));

    const findValues = {
        type: 'dish',
        ...(!!q && { $or: [{ title: new RegExp(q, 'i') }, { description: new RegExp(q, 'i') }] }),
        ...(!!category && { categoryID }),
        ...(!!subcategory && { subcategoryID }),
    };

    const dishes = await DishesDAL.findAll(findValues);

    return dishes;
};

const getOne = async id => {
    if (!id) {
        throw new Error('ID was not set');
    }
    const dish = await DishesDAL.findByID(id);
    return dish;
};

const update = async dish => {
    if (!dish.id) {
        throw new Error('ID was not set');
    }
    const updatedDish = await DishesDAL.update(dish);
    return updatedDish;
};

const deleteDish = async id => {
    if (!id) {
        throw new Error('ID was not set');
    }
    const dish = await DishesDAL.deleteDish(id);
    return dish;
};

export const DishesService = {
    create,
    getAll,
    getOne,
    update,
    deleteDish,
};
