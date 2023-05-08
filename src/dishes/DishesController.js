import {
    DishesServiceCreate,
    DishesServiceGetAll,
    DishesServiceGetOne,
    DishesServiceUpdate,
    DishesServiceDelete,
    DishesServiceGetByCategory,
    DishesServiceGetBySUBCategory,
    DishesServiceGetCategories,
    DishesServiceGetSUBCategories,
} from './DishesService.js';

export const DishesControllerCreate = async (req, res) => {
    try {
        const dish = await DishesServiceCreate(req.body);
        res.json(dish);
    } catch (e) {
        res.status(500).json(e.message);
    }
};

export const DishesControllerGetAll = async (req, res) => {
    try {
        const dishes = await DishesServiceGetAll();
        return res.json(dishes);
    } catch (e) {
        res.status(500).json(e.message);
    }
};

export const DishesControllerGetByCategory = async (req, res) => {
    try {
        const dishes = await DishesServiceGetByCategory(req.params.category);
        return res.json(dishes);
    } catch (e) {
        res.status(500).json(e.message);
    }
};

export const DishesControllerGetCategories = async (req, res) => {
    try {
        const categories = await DishesServiceGetCategories();
        return res.json(categories);
    } catch (e) {
        res.status(500).json(e.message);
    }
};

export const DishesControllerGetBySUBCategory = async (req, res) => {
    try {
        const { category, subcategory } = req.params;
        const dishes = await DishesServiceGetBySUBCategory(category, subcategory);
        return res.json(dishes);
    } catch (e) {
        res.status(500).json(e.message);
    }
};

export const DishesControllerGetSUBCategories = async (req, res) => {
    try {
        const subcategories = await DishesServiceGetSUBCategories(req.params.category);
        return res.json(subcategories);
    } catch (e) {
        res.status(500).json(e.message);
    }
};

export const DishesControllerGetOne = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(404).json({ error: 'Incorrect ID' });
        }

        const dish = await DishesServiceGetOne(req.params.id);

        return res.json(dish);
    } catch (e) {
        res.status(500).json(e.message);
    }
};
export const DishesControllerUpdate = async (req, res) => {
    try {
        const updatedDish = await DishesServiceUpdate(req.body);
        return res.json(updatedDish);
    } catch (e) {
        res.status(500).json(e.message);
    }
};
export const DishesControllerDelete = async (req, res) => {
    try {
        const dish = await DishesServiceDelete(req.params.id);
        if (!dish) {
            res.status(404).json('ID was not founded or already deleted');
        }
        return res.json(dish);
    } catch (e) {
        res.status(500).json(e.message);
    }
};
