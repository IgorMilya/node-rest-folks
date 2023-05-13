import CategoryDB from './CategoriesModel.js';

export const createCategory = async category => {
    return CategoryDB.create(category);
};

export const findCategoryALL = async () => {
    return CategoryDB.find();
};

export const findOne = async category => {
    return CategoryDB.findOne({ title: category }, 'picture');
};

export const findCategoryByIDandUpdate = async category => {
    return CategoryDB.findByIdAndUpdate(category.id, category, { new: true });
};

export const findCategoryByIDandDelete = async id => {
    return CategoryDB.findByIdAndDelete(id);
};
