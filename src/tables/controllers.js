import {
  getTablesService,
  addTableService,
  getTableReservationInfoService,
  changeTableStatusService,
  deleteTableService,
  addReservationService,
  removeReservationService,
  getReservationBySelectedDateService,
  updateReservationService,
} from './services.js'

export const addTableController = async (req, res) => {
  try {
    const data = await addTableService(req.body)
    res.json(data)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

export const deleteTableController = async (req, res) => {
  try {
    const data = await deleteTableService(req.params.id)
    res.json(data)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

export const getTablesController = async (req, res) => {
  try {
    const data = await getTablesService()
    res.json(data)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

export const getTableReservationInfoController = async (req, res) => {
  try {
    const data = await getTableReservationInfoService(req.params.id)
    res.json(data)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

export const updateTableStatusController = async (req, res) => {
  try {
    const data = await changeTableStatusService(req.params.id)
    res.json(data)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

export const addReservationController = async (req, res) => {
  try {
    const data = await addReservationService(req.params.id, {
      $push: { reservationInfo: req.body },
    })

    res.json(data)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

export const removeReservationController = async (req, res) => {
  try {
    const { tableNumber, id } = req.params
    const data = await removeReservationService(
      { number: tableNumber },
      { $pull: { reservationInfo: { _id: id } } },
    )

    res.json(data)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

export const getReservationBySelectedDateController = async (req, res) => {
  const { id, date } = req.params
  try {
    const data = await getReservationBySelectedDateService(id, date)
    res.json(data)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

export const updateReservationController = async (req, res) => {
  try {
    const data = await updateReservationService(req.params.id, req.body)
    res.json(data)
  } catch (err) {
    res.status(500).json(err.message)
  }
}
