import { Router } from 'express';
import validateSchema from '../utils/validation.js';
import { dishesValidateSchema } from './validationsSchema.js';

import { DishesController } from './DishesController.js';

export const dishRouter = new Router();
export const dishesDefaultPath = '/api/dishes';

dishRouter.post('/', validateSchema(dishesValidateSchema), DishesController.create);
dishRouter.get('/', DishesController.getAll);
dishRouter.get('/:id', DishesController.getOne);
dishRouter.put('/', DishesController.update);
dishRouter.delete('/:id', DishesController.deleteDish);
