import { Router } from 'express'
import { TableController } from './controllers.js'

export const tablesRouter = new Router()
export const tablesDefaultPath = '/api/tables'

tablesRouter.get('/', TableController.getAll)
tablesRouter.get('/free', TableController.getFree)
tablesRouter.get('/status/:tableNumber', TableController.getTableStatus)
tablesRouter.get('/reservation/:tableNumber', TableController.getTableReservationInfo)
tablesRouter.get('/reservation/:id/:date', TableController.getReservationBySelectDate)

tablesRouter.post('/', TableController.addNewTable)

tablesRouter.post('/reservation/:id', TableController.addNewReservation)
tablesRouter.put('/:tableNumber', TableController.updateTableStatus)
tablesRouter.put('/reservation/update/:id', TableController.updateReservation)
tablesRouter.delete('/:id', TableController.deleteTable)
tablesRouter.delete('/reservation/:tableNumber/:id', TableController.removeReservation)
