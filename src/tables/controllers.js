import { TableService } from './services.js'

const getFree = async (req, res) => {
  try {
    const data = await TableService.getFree()
    res.json(data)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

const getTableStatus = async (req, res) => {
  try {
    const data = await TableService.getTableStatus(req.params.tableNumber)
    res.json(data)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

const getTableReservationInfo = async (req, res) => {
  try {
    const data = await TableService.getTableReservationInfo(req.params.tableNumber)
    res.json(data)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

const getReservationBySelectDate = async (req, res) => {
  const { id, date } = req.params
  try {
    const data = await TableService.getReservationBySelectedDate(id, date)
    res.json(data)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

const addNewTable = async (req, res) => {
  try {
    const data = await TableService.addNewTable(req.body)
    res.json(data)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

const deleteTable = async (req, res) => {
  try {
    const data = await TableService.deleteTable(req.params.id)
    res.json(data)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

const getAll = async (req, res) => {
  try {
    const data = await TableService.getAll()
    res.json(data)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

const updateTableStatus = async (req, res) => {
  try {
    const data = await TableService.changeTableStatus(req.params.tableNumber)
    res.json(data)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

const addNewReservation = async (req, res) => {
  try {
    const data = await TableService.addNewReservation(req.params.id, req.body)

    res.json(data)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

const removeReservation = async (req, res) => {
  try {
    const { tableNumber, id } = req.params
    const data = await TableService.removeReservation(tableNumber, id)

    res.json(data)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

const updateReservation = async (req, res) => {
  try {
    const data = await TableService.updateReservation(req.params.id, req.body)
    res.json(data)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

export const TableController = {
  getFree,
  getTableStatus,
  getTableReservationInfo,
  getReservationBySelectDate,
  addNewTable,
  deleteTable,
  getAll,
  updateTableStatus,
  addNewReservation,
  removeReservation,
  updateReservation,
}
