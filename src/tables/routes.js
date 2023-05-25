import { Router } from 'express'
import { controllers } from './controllers.js'

export const tablesRouter = new Router()
export const tablesDefaultPath = '/api/tables'

tablesRouter.get('/', controllers.getAllTables)
tablesRouter.get('/free', controllers.getFreeTables)
tablesRouter.get('/reservation/:tableNumber', controllers.getTableReservationInfo)
tablesRouter.get('/reservation/:id/:date', controllers.getReservationBySelectDate)
tablesRouter.post('/', controllers.addNewTable)
tablesRouter.post('/reservation/:id', controllers.addNewReservation)
tablesRouter.put('/:tableNumber', controllers.updateTableStatus)
tablesRouter.put('/reservation/update/:id', controllers.updateReservation)
tablesRouter.delete('/:id', controllers.deleteTable)
tablesRouter.delete('/reservation/:tableNumber/:id', controllers.removeReservation)
