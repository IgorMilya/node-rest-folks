import { dataAccess } from './dataAccess.js';
import { getCurrentDate } from '../utils/currentDate.js';

const getAllTables = async () => {
    return await dataAccess.getAllTables();
};

const getFreeTables = async () => {
    const allTables = await dataAccess.getAllTables();

    return allTables.filter(({ reserved }) => !reserved).map(({ number, id }) => ({ number, id }));
};

const getTableReservationInfo = async id => {
    const currentDate = getCurrentDate();
    const { number, reservationInfo } = await dataAccess.getTable(id);

    const tableReservations = reservationInfo.filter(({ date }) => date === currentDate).map(({ time }) => time);

    if (tableReservations.length) {
        return {
            message: `Table ${number} is currently reserved for the following hours:`,
            tableReservations,
        };
    } else {
        return { message: 'No reservations for this table' };
    }
};

const getReservationBySelectedDate = async (id, date) => {
    const { reservationInfo } = await dataAccess.getTable(id);

    return reservationInfo.filter(item => item.date === date);
};

const addNewTable = async body => {
    return await dataAccess.addNewTable(body);
};

const changeTableStatus = async id => {
    const { reserved } = await dataAccess.getTable(id);

    return await dataAccess.updateTableInfo(id, { reserved: !reserved });
};

const deleteTable = async id => {
    return await dataAccess.deleteTableDataAccess(id);
};

const addNewReservation = async (id, reservation) => {
    const updateOptions = { $push: { reservationInfo: reservation } };

    return await dataAccess.updateTableInfo(id, updateOptions);
};

const removeReservation = async (tableNumber, reservationID) => {
    const removeOptions = { $pull: { reservationInfo: { _id: reservationID } } };

    return await dataAccess.removeReservation({ number: tableNumber }, removeOptions);
};

const updateReservation = async (id, data) => {
    const { reservationInfo } = await dataAccess.getTable(id);
    const updatedInfo = reservationInfo.map(item => (item.id === data.id ? data : item));

    return await dataAccess.updateTableInfo(id, { reservationInfo: updatedInfo });
};

export const services = {
    getAllTables,
    getFreeTables,
    getTableReservationInfo,
    getReservationBySelectedDate,
    addNewTable,
    changeTableStatus,
    deleteTable,
    addNewReservation,
    removeReservation,
    updateReservation,
};
