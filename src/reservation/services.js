import dayjs from 'dayjs'
import { ReservationDataAccess } from './dataAccess.js'

const create = async body => {
  return await ReservationDataAccess.create(body)
}

const getOne = async id => {
  return await ReservationDataAccess.getOne(id)
}

const getAll = async () => {
  return await ReservationDataAccess.getAll()
}

const getByDate = async data => {
  const reservations = await ReservationDataAccess.getAll()

  return reservations.filter(({ date }) => dayjs(data).isSame(date))
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
