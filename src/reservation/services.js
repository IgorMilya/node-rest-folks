import { ReservationDataAccess } from './dataAccess.js'
import { prepareReservationInfo } from './utils.js'

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

export const ReservationService = {
  create,
  getOne,
  getAll,
}
