import { TablesServiceCreate, TablesServiceGetAll, TablesServiceGetOne, TablesServiceUpdate, TablesServiceDelete } from './TablesService.js';

export const TablesControllerCreate = async (req, res) => {
    try {
        const table = await TablesServiceCreate(req.body);
        res.json(table);
    } catch (e) {
        res.status(500).json(e.message);
    }
};

export const TablesControllerGetAll = async (req, res) => {
    try {
        const tables = await TablesServiceGetAll();
        return res.json(tables);
    } catch (e) {
        res.status(500).json(e.message);
    }
};
export const TablesControllerGetOne = async (req, res) => {
    try {
        const table = await TablesServiceGetOne(req.params.id);
        return res.json(table);
    } catch (e) {
        res.status(500).json(e.message);
    }
};
export const TablesControllerUpdate = async (req, res) => {
    try {
        const updateTable = await TablesServiceUpdate(req.body);
        return res.json(updateTable);
    } catch (e) {
        res.status(500).json(e.message);
    }
};
export const TablesControllerDelete = async (req, res) => {
    try {
        const table = await TablesServiceDelete(req.params.id);
        return res.json(table);
    } catch (e) {
        res.status(500).json(e.message);
    }
};
