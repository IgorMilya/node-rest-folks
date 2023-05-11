import { Router } from 'express'
import {
  addTableController,
  getTablesController,
  getTableReservationInfoController,
  updateTableStatusController,
  deleteTableController,
  addReservationController,
  removeReservationController,
  getReservationBySelectedDateController,
  updateReservationController,
} from './controllers.js'

export const tablesRouter = new Router()
export const tablesDefaultPath = '/api/restaurant/tables'

tablesRouter.get('/', getTablesController)
tablesRouter.post('/', addTableController)
tablesRouter.put('/:id', updateTableStatusController)
tablesRouter.delete('/:id', deleteTableController)

tablesRouter.get('/reservation/:id', getTableReservationInfoController)
tablesRouter.get('/reservation/:id/:date', getReservationBySelectedDateController)
tablesRouter.post('/reservation/:id', addReservationController)
tablesRouter.put('/reservation/update/:id', updateReservationController)
tablesRouter.delete('/reservation/:tableNumber/:id', removeReservationController)
