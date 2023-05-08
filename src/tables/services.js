import {
  addTableDataAccess,
  getTableDataAccess,
  getTablesDataAccess,
  updateTableStatusDataAccess,
  deleteTableDataAccess,
  addReservationDataAccess,
} from './dataAccess.js'
import { getCurrentDate } from '../utils/currentDate.js'

export const getTablesService = async () => {
  const data = await getTablesDataAccess()
  return data
}

export const addTableService = async body => {
  const newTable = await addTableDataAccess(body)
  return newTable
}

export const getTableReservationInfoService = async id => {
  const currentDate = getCurrentDate()
  const { reservationInfo } = await getTableDataAccess(id)

  const tableReservations = reservationInfo
    .filter(({ date }) => date === currentDate)
    .map(({ time }) => time)

  if (tableReservations.length) {
    return { message: 'The table is reserved for the following dates:', tableReservations }
  } else {
    return { message: 'No reservations for this table', tableReservations }
  }
}

export const changeTableStatusService = async id => {
  const { reserved } = await getTableDataAccess(id)
  const updatedTable = await updateTableStatusDataAccess(id, { reserved: !reserved })

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
