import { CategoriesServiceCreate, CategoriesServiceGetAll, CategoriesServiceUpdate, CategoriesServiceDelete } from './CategoriesService.js';

export const CategoriesControllerCreate = async (req, res) => {
    try {
        const category = await CategoriesServiceCreate(req.body);
        res.json(category);
    } catch (e) {
        res.status(500).json(e.message);
    }
};

export const CategoriesControllerGetAll = async (req, res) => {
    try {
        const { category } = req.query;

        const categories = await CategoriesServiceGetAll(category);
        return res.json(categories);
    } catch (e) {
        res.status(500).json(e.message);
    }
};

export const CategoriesControllerUpdate = async (req, res) => {
    try {
        const updatedCategory = await CategoriesServiceUpdate(req.body);
        return res.json(updatedCategory);
    } catch (e) {
        res.status(500).json(e.message);
    }
};
export const CategoriesControllerDelete = async (req, res) => {
    try {
        const category = await CategoriesServiceDelete(req.params.id);
        if (!category) {
            res.status(404).json('ID was not founded or already deleted');
        } else {
            return res.json(category);
        }
    } catch (e) {
        res.status(500).json(e.message);
    }
};
