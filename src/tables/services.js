import {
  addTableDataAccess,
  getTableDataAccess,
  getTablesDataAccess,
  updateTableInfoDataAccess,
  deleteTableDataAccess,
  addReservationDataAccess,
  removeReservationDataAccess,
} from './dataAccess.js'
import { getCurrentDate } from '../utils/currentDate.js'

export const getTablesService = async () => {
  return await getTablesDataAccess()
}

export const addTableService = async body => {
  return await addTableDataAccess(body)
}

export const getTableReservationInfoService = async id => {
  const currentDate = getCurrentDate()
  const { number, reservationInfo } = await getTableDataAccess(id)

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

export const changeTableStatusService = async id => {
  const { reserved } = await getTableDataAccess(id)
  const updatedTable = await updateTableInfoDataAccess(id, { reserved: !reserved })

  return updatedTable
}

export const deleteTableService = async id => {
  const deletedTable = await deleteTableDataAccess(id)

  return deletedTable
}

export const addReservationService = async (id, reservation) => {
  const updatedTable = await addReservationDataAccess(id, reservation)

  return updatedTable
}

export const removeReservationService = async (filterField, fieldToRemove) => {
  const removedReservation = await removeReservationDataAccess(filterField, fieldToRemove)

  return removedReservation
}

export const getReservationBySelectedDateService = async (id, date) => {
  const { reservationInfo } = await getTableDataAccess(id)

  return reservationInfo.filter(item => item.date === date)
}

export const updateReservationService = async (id, data) => {
  const { reservationInfo } = await getTableDataAccess(id)
  const updatedInfo = reservationInfo.map(item => (item._id == data._id ? data : item))

  return await updateTableInfoDataAccess(id, { reservationInfo: updatedInfo })
}
