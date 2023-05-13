import * as dataAccess from './dataAccess.js'
import { getCurrentDate } from '../utils/currentDate.js'

export const getAllTables = async () => {
  return await dataAccess.getAllTables()
}

export const getFreeTables = async () => {
  const allTables = await dataAccess.getAllTables()

  return allTables.filter(({ reserved }) => !reserved).map(({ number, id }) => ({ number, id }))
}

export const getTableReservationInfo = async id => {
  const currentDate = getCurrentDate()
  const { number, reservationInfo } = await dataAccess.getTable(id)

  const tableReservations = reservationInfo
    .filter(({ date }) => date === currentDate)
    .map(({ time }) => time)

  if (tableReservations.length) {
    return {
      message: `Table ${number} is currently reserved for the following hours:`,
      tableReservations,
    }
  } else {
    return { message: 'No reservations for this table' }
  }
}

export const getReservationBySelectedDate = async (id, date) => {
  const { reservationInfo } = await dataAccess.getTable(id)

  return reservationInfo.filter(item => item.date === date)
}

export const addNewTable = async body => {
  return await dataAccess.addNewTable(body)
}

export const changeTableStatus = async id => {
  const { reserved } = await dataAccess.getTable(id)

  return await dataAccess.updateTableInfo(id, { reserved: !reserved })
}

export const deleteTable = async id => {
  return await dataAccess.deleteTableDataAccess(id)
}

export const addNewReservation = async (id, reservation) => {
  const updateOptions = { $push: { reservationInfo: reservation } }

  return await dataAccess.updateTableInfo(id, updateOptions)
}

export const removeReservation = async (tableNumber, reservationID) => {
  const removeOptions = { $pull: { reservationInfo: { _id: reservationID } } }

  return await dataAccess.removeReservation({ number: tableNumber }, removeOptions)
}

export const updateReservation = async (id, data) => {
  const { reservationInfo } = await dataAccess.getTable(id)
  const updatedInfo = reservationInfo.map(item => (item.id === data.id ? data : item))

  return await dataAccess.updateTableInfo(id, { reservationInfo: updatedInfo })
}
