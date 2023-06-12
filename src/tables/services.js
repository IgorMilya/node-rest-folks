import { TablesDataAccess } from './dataAccess.js'
import { prepareTablesData } from './utils.js'
import { ReservationDataAccess } from '../reservation/dataAccess.js'

const getCanvas = async () => {
  const tables = await TablesDataAccess.getAll()
  const reservations = await ReservationDataAccess.getAll({ status: 'active' })

  return prepareTablesData(tables, reservations)
}

const getAll = async () => {
  return await TablesDataAccess.getAll()
}

const getFree = async () => {
  const allTables = await TablesDataAccess.getAll()

  return allTables
    .filter(({ status }) => status === 'free')
    .map(({ number, id }) => ({ number, id }))
}

const getTableStatus = async tableNumber => {
  const { status } = await TablesDataAccess.getTableByName(tableNumber)

  return status
}

const addNewTable = async body => {
  return await TablesDataAccess.addNew(body)
}

const changeTableStatus = async tableNumber => {
  const { id, status } = await TablesDataAccess.getTableByName(tableNumber)
  const newStatus = status === 'free' ? 'pre-order' : status === 'pre-order' ? 'busy' : 'free'

  setTimeout(async () => {
    const { id, status } = await TablesDataAccess.getTableByName(tableNumber)
    if (status === 'pre-order') {
      await TablesDataAccess.updateTableInfo(id, { status: 'free' })
    }
  }, 480000)

  return await TablesDataAccess.updateTableInfo(id, { status: newStatus })
}

const deleteTable = async id => {
  return await TablesDataAccess.deleteTable(id)
}

// const addNewReservation = async (id, reservation) => {
//   const updateOptions = { $push: { reservationInfo: reservation } }
//
//   return await TablesDataAccess.updateTableInfo(id, updateOptions)
// }

// const removeReservation = async (tableNumber, reservationID) => {
//   const removeOptions = { $pull: { reservationInfo: { _id: reservationID } } }
//
//   return await TablesDataAccess.removeReservation({ number: tableNumber }, removeOptions)
// }

// const updateReservation = async (id, data) => {
//   const { reservationInfo } = await TablesDataAccess.getTable(id)
//   const updatedInfo = reservationInfo.map(item => (item.id === data.id ? data : item))
//
//   return await TablesDataAccess.updateTableInfo(id, { reservationInfo: updatedInfo })
// }

// export const getTableReservationInfo = async tableNumber => {
//   const currentDate = getCurrentDate()
//   const { number, reservationInfo } = await TablesDataAccess.getTableByName(tableNumber)
//
//   const tableReservations = reservationInfo
//     .filter(({ date }) => date === currentDate)
//     .map(({ time }) => time)
//
//   if (tableReservations.length) {
//     return {
//       message: `Table ${number} is currently reserved for the following hours:`,
//       tableReservations,
//     }
//   } else {
//     return { message: 'No reservations for this table', tableReservations }
//   }
// }

// const getReservationBySelectedDate = async (id, date) => {
//   const { reservationInfo } = await TablesDataAccess.getTable(id)
//
//   return reservationInfo.filter(item => item.date === date)
// }

export const TableService = {
  getAll,
  getCanvas,
  getFree,
  getTableStatus,
  addNewTable,
  changeTableStatus,
  deleteTable,
}
