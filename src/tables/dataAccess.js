import { TableModel } from './TableModel.js'

export const getTablesDataAccess = async () => {
  return TableModel.find()
}

export const addTableDataAccess = async body => {
  return new TableModel(body).save()
}

export const getTableDataAccess = async id => {
  return TableModel.findById(id)
}

export const updateTableStatusDataAccess = async (id, status) => {
  return TableModel.findByIdAndUpdate(id, status)
}

export const deleteTableDataAccess = async id => {
  return TableModel.findByIdAndDelete(id)
}

export const addReservationDataAccess = async (id, reservation) => {
  return TableModel.findByIdAndUpdate(id, reservation)
}
