import DishDB from './DishesModel.js';

export const createDish = async dish => {
    return DishDB.create(dish);
};

export const findDishALL = async findValues => {
    return DishDB.aggregate([
        {
            $match: findValues,
        },
        {
            $lookup: {
                from: 'categories',
                localField: 'categoryID',
                foreignField: '_id',
                as: 'categoryData',
            },
        },
        {
            $lookup: {
                from: 'categories',
                localField: 'subcategoryID',
                foreignField: '_id',
                as: 'subcategoryData',
            },
        },
        {
            $project: {
                title: 1,
                price: 1,
                picture: 1,
                description: 1,
                category: { $arrayElemAt: ['$categoryData.title', 0] },
                subcategory: { $arrayElemAt: ['$subcategoryData.title', 0] },
                weight: 1,
                bonus: 1,
                additionalFood: 1,
            },
        },
    ]);
};

export const findDisByID = async id => {
    return DishDB.findById(id);
};

export const findDisByIDandUpdate = async dish => {
    return DishDB.findByIdAndUpdate(dish.id, dish, { new: true });
};

export const findDisByIDandDelete = async id => {
    return DishDB.findByIdAndDelete(id);
};
