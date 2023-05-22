import { TableModel } from './TableModel.js'

export const getAllTables = async () => TableModel.find()

export const addNewTable = async body => new TableModel(body).save()

export const getTable = async id => TableModel.findById(id)
export const getTableByName = async tableNumber => TableModel.findOne({ number: tableNumber })

export const updateTableInfo = async (id, data) => TableModel.findByIdAndUpdate(id, data)

export const deleteTableDataAccess = async id => TableModel.findByIdAndDelete(id)

export const removeReservation = async (filterField, fieldToRemove) => {
  return TableModel.updateOne(filterField, fieldToRemove)
}
