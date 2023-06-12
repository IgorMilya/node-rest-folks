import { ReservationDataAccess } from './dataAccess.js'
import { prepareReservationInfo } from './utils.js'

const create = async body => {
  const reservation = prepareReservationInfo(body)

  return await ReservationDataAccess.create(reservation)
}

const getOne = async id => {
  return await ReservationDataAccess.getOne(id)
}

const getAll = async props => {
  return await ReservationDataAccess.getAll(props)
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
  update,
  deleteOne,
}
