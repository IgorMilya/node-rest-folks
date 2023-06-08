import { dataAccess } from './dataAccess.js'
import { getCurrentDate } from '../utils/currentDate.js'

const getAll = async () => {
  return await dataAccess.getAllTables()
}

const getFree = async () => {
  const allTables = await dataAccess.getAllTables()

  return allTables
    .filter(({ status }) => status === 'free')
    .map(({ number, id }) => ({ number, id }))
}

const getTableStatus = async tableNumber => {
  const { status } = await dataAccess.getTableByName(tableNumber)

  return status
}

export const getTableReservationInfo = async tableNumber => {
  const currentDate = getCurrentDate()
  const { number, reservationInfo } = await dataAccess.getTableByName(tableNumber)

  const tableReservations = reservationInfo
    .filter(({ date }) => date === currentDate)
    .map(({ time }) => time)

  if (tableReservations.length) {
    return {
      message: `Table ${number} is currently reserved for the following hours:`,
      tableReservations,
    }
  } else {
    return { message: 'No reservations for this table', tableReservations }
  }
}

const getReservationBySelectedDate = async (id, date) => {
  const { reservationInfo } = await dataAccess.getTable(id)

  return reservationInfo.filter(item => item.date === date)
}

const addNewTable = async body => {
  return await dataAccess.addNewTable(body)
}

const changeTableStatus = async tableNumber => {
  const { id, status } = await dataAccess.getTableByName(tableNumber)
  const newStatus = status === 'free' ? 'pre-order' : status === 'pre-order' ? 'busy' : 'free'

  setTimeout(async () => {
    const { id, status } = await dataAccess.getTableByName(tableNumber)
    if (status === 'pre-order') {
      await dataAccess.updateTableInfo(id, { status: 'free' })
    }
  }, 480000)

  return await dataAccess.updateTableInfo(id, { status: newStatus })
}

const deleteTable = async id => {
  return await dataAccess.deleteTableDataAccess(id)
}

const addNewReservation = async (id, reservation) => {
  const updateOptions = { $push: { reservationInfo: reservation } }

  return await dataAccess.updateTableInfo(id, updateOptions)
}

const removeReservation = async (tableNumber, reservationID) => {
  const removeOptions = { $pull: { reservationInfo: { _id: reservationID } } }

  return await dataAccess.removeReservation({ number: tableNumber }, removeOptions)
}

const updateReservation = async (id, data) => {
  const { reservationInfo } = await dataAccess.getTable(id)
  const updatedInfo = reservationInfo.map(item => (item.id === data.id ? data : item))

  return await dataAccess.updateTableInfo(id, { reservationInfo: updatedInfo })
}

export const TableService = {
  getAll,
  getFree,
  getTableStatus,
  getTableReservationInfo,
  getReservationBySelectedDate,
  addNewTable,
  changeTableStatus,
  deleteTable,
  addNewReservation,
  removeReservation,
  updateReservation,
}
