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

export const updateTableInfoDataAccess = async (id, status) => {
  return TableModel.findByIdAndUpdate(id, status)
}

export const deleteTableDataAccess = async id => {
  return TableModel.findByIdAndDelete(id)
}

export const addReservationDataAccess = async (id, data) => {
  return TableModel.findByIdAndUpdate(id, data)
}

export const removeReservationDataAccess = async (filterField, fieldToRemove) => {
  return TableModel.updateOne(filterField, fieldToRemove)
}
