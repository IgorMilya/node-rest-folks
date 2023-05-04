import TableDB from './TablesDAL.js';

export const TablesServiceCreate = async table => {
    const createTable = await TableDB.create(table);
    return createTable;
};

export const TablesServiceGetAll = async () => {
    const tables = await TableDB.find();
    return tables;
};
export const TablesServiceGetOne = async id => {
    if (!id) {
        throw new Error('не указан ID');
    }
    const table = await TableDB.findById(id);
    return table;
};

export const TablesServiceUpdate = async table => {
    if (!table._id) {
        throw new Error('не указан ID');
    }
    const updateTable = await TableDB.findByIdAndUpdate(table._id, table, { new: true });
    return updateTable;
};

export const TablesServiceDelete = async id => {
    if (!id) {
        throw new Error('не указан ID');
    }
    const table = await TableDB.findByIdAndDelete(id);
    return table;
};
