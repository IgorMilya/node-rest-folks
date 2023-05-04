import { DishesServiceCreate, DishesServiceGetAll, DishesServiceGetOne, DishesServiceUpdate, DishesServiceDelete } from './DishesService.js';

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
export const DishesControllerGetOne = async (req, res) => {
    try {
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
        return res.json(dish);
    } catch (e) {
        res.status(500).json(e.message);
    }
};
