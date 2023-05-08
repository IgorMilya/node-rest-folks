import { Router } from 'express'
import {
  addTableController,
  getTablesController,
  getTableReservationInfoController,
  updateTableStatusController,
  deleteTableController,
  addReservationController,
} from './controllers.js'

export const tablesRouter = new Router()
export const tablesDefaultPath = '/api/restaurant/tables'

tablesRouter.post('/', addTableController)
tablesRouter.get('/', getTablesController)
tablesRouter.get('/:id', getTableReservationInfoController)
tablesRouter.put('/:id', updateTableStatusController)
tablesRouter.delete('/:id', deleteTableController)
tablesRouter.post('/:id', addReservationController)
