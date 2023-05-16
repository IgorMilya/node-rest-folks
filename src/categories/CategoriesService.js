import { createCategory, findCategoryALL, findCategoryByIDandUpdate, findCategoryByIDandDelete, findSubCategoryByCategory, findOne } from './CategoriesDAL.js';

export const CategoriesServiceCreate = async category => {
    const createdCategory = await createCategory(category);
    return createdCategory;
};

export const CategoriesServiceGetAll = async category => {
    let categories = [];
    if (!!category) {
        const categoryID = await findOne(category, 'id');
        categories = await findSubCategoryByCategory(categoryID);
    } else {
        categories = await findCategoryALL();
    }

    return categories;
};

export const CategoriesServiceUpdate = async category => {
    if (!category.id) {
        throw new Error('ID was not set');
    }
    const updatedCategory = await findCategoryByIDandUpdate(category);
    return updatedCategory;
};

export const CategoriesServiceDelete = async id => {
    if (!id) {
        throw new Error('ID was not set');
    }
    const category = await findCategoryByIDandDelete(id);
    return category;
};
