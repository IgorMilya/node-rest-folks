import * as services from './services.js'

export const getFreeTables = async (req, res) => {
  try {
    const data = await services.getFreeTables()
    res.json(data)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

export const getTableReservationInfo = async (req, res) => {
  try {
    const data = await services.getTableReservationInfo(req.params.id)
    res.json(data)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

export const getReservationBySelectDate = async (req, res) => {
  const { id, date } = req.params
  try {
    const data = await services.getReservationBySelectedDate(id, date)
    res.json(data)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

export const addNewTable = async (req, res) => {
  try {
    const data = await services.addNewTable(req.body)
    res.json(data)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

export const deleteTable = async (req, res) => {
  try {
    const data = await services.deleteTable(req.params.id)
    res.json(data)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

export const getAllTables = async (req, res) => {
  try {
    const data = await services.getAllTables()
    res.json(data)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

export const updateTableStatus = async (req, res) => {
  try {
    const data = await services.changeTableStatus(req.params.id)
    res.json(data)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

export const addNewReservation = async (req, res) => {
  try {
    const data = await services.addNewReservation(req.params.id, req.body)

    res.json(data)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

export const removeReservation = async (req, res) => {
  try {
    const { tableNumber, id } = req.params
    const data = await services.removeReservation(tableNumber, id)

    res.json(data)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

export const updateReservation = async (req, res) => {
  try {
    const data = await services.updateReservation(req.params.id, req.body)
    res.json(data)
  } catch (err) {
    res.status(500).json(err.message)
  }
}
