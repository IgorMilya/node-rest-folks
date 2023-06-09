import { ReservationModel } from './model.js'

const create = async body => new ReservationModel(body).save()

const getOne = async id => {
  return ReservationModel.findById(id).populate('table')
}

const getAll = async () => {
  return ReservationModel.find().populate('table')
}

export const ReservationDataAccess = {
  create,
  getOne,
  getAll,
}
