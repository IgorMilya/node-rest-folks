import { Router } from 'express';
import validateSchema from '../utils/validation.js';

import { ordersValidateSchema } from './validationsSchema.js';

import { OrdersControllerCreate, OrdersControllerGetAll, OrdersControllerGetOne, OrdersControllerUpdate, OrdersControllerDelete } from './OrdersController.js';

export const orderRouter = new Router();
export const orderDefaultPath = '/api/restaurant/orders';

orderRouter.post('/', validateSchema(ordersValidateSchema), OrdersControllerCreate);
orderRouter.get('/', OrdersControllerGetAll);
orderRouter.get('/:id', OrdersControllerGetOne);
orderRouter.put('/', OrdersControllerUpdate);
orderRouter.delete('/:id', OrdersControllerDelete);
