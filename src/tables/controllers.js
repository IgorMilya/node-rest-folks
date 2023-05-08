import {
  getTablesService,
  addTableService,
  getTableReservationInfoService,
  changeTableStatusService,
  deleteTableService,
  addReservationService,
} from './services.js'

export const getTablesController = async (req, res) => {
  try {
    const data = await getTablesService()
    res.json(data)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

export const addTableController = async (req, res) => {
  try {
    const data = await addTableService(req.body)
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

export const deleteTableController = async (req, res) => {
  try {
    const data = await deleteTableService(req.params.id)
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
