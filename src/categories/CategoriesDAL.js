import CategoryDB from './CategoriesModel.js';

export const createCategory = async category => {
    return CategoryDB.create(category);
};

export const findCategoryALL = async () => {
    return CategoryDB.find({ type: 'category' }, { title: 1, picture: 1 });
};

export const findSubCategoryByCategory = async parentId => {
    return CategoryDB.find({ parent: parentId }, 'title');
};

export const findOne = async (category, field) => {
    return CategoryDB.findOne({ title: category }, field);
};

export const findCategoryByIDandUpdate = async category => {
    return CategoryDB.findByIdAndUpdate(category.id, category, { new: true });
};

export const findCategoryByIDandDelete = async id => {
    return CategoryDB.findByIdAndDelete(id);
};
