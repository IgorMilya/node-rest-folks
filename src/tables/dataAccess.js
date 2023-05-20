import { TableModel } from './TableModel.js';

const getAllTables = async () => TableModel.find();

const addNewTable = async body => new TableModel(body).save();

const getTable = async id => TableModel.findById(id);

const updateTableInfo = async (id, data) => TableModel.findByIdAndUpdate(id, data);
const deleteTableDataAccess = async id => TableModel.findByIdAndDelete(id);

const removeReservation = async (filterField, fieldToRemove) => {
    return TableModel.updateOne(filterField, fieldToRemove);
};

export const dataAccess = {
    getAllTables,
    addNewTable,
    getTable,
    updateTableInfo,
    deleteTableDataAccess,
    removeReservation,
};
