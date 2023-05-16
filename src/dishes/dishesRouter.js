import { Router } from 'express';
import validateSchema from '../utils/validation.js';
import { dishesValidateSchema } from './validationsSchema.js';

import { DishesControllerCreate, DishesControllerGetAll, DishesControllerGetOne, DishesControllerUpdate, DishesControllerDelete } from './DishesController.js';

export const dishRouter = new Router();
export const dishesDefaultPath = '/api/dishes';

dishRouter.post('/', validateSchema(dishesValidateSchema), DishesControllerCreate);
dishRouter.get('/', DishesControllerGetAll);
dishRouter.get('/:id', DishesControllerGetOne);
dishRouter.put('/', DishesControllerUpdate);
dishRouter.delete('/:id', DishesControllerDelete);
