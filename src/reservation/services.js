import { ReservationDataAccess } from './dataAccess.js'
import { getReservationsByDate, prepareReservationInfo } from './utils.js'

const create = async body => {
  const reservation = prepareReservationInfo(body)

  return await ReservationDataAccess.create(reservation)
}

const getOne = async id => {
  return await ReservationDataAccess.getOne(id)
}

const getAll = async () => {
  return await ReservationDataAccess.getAll()
}

const getByDate = async date => {
  const reservations = await ReservationDataAccess.getAll()

  const test = getReservationsByDate(reservations, date)

  return test
}

const deleteOne = async id => {
  return await ReservationDataAccess.deleteOne(id)
}

const update = async body => {
  return await ReservationDataAccess.update(body)
}

export const ReservationService = {
  create,
  getOne,
  getAll,
  getByDate,
  update,
  deleteOne,
}
