import { Router } from 'express'
import { ReservationController } from './controllers.js'

export const reservationRouter = new Router()
export const reservationDefaultPath = '/api/reservation'

reservationRouter.post('/', ReservationController.create)
reservationRouter.get('/:id', ReservationController.getOne)
reservationRouter.get('/', ReservationController.getAll)
