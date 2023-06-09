import { ReservationService } from './services.js'

const create = async (req, res) => {
  try {
    const reservation = await ReservationService.create(req.body)

    res.status(201).json(reservation)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getOne = async (req, res) => {
  try {
    const data = await ReservationService.getOne(req.params.id)

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getAll = async (req, res) => {
  try {
    const data = await ReservationService.getAll()

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const ReservationController = {
  create,
  getOne,
  getAll,
}
