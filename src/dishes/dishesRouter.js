import { Router } from 'express';
import validateSchema from '../utils/validation.js';
import { dishesValidateSchema } from './validationsSchema.js';

import {
    DishesControllerCreate,
    DishesControllerGetAll,
    DishesControllerGetOne,
    DishesControllerUpdate,
    DishesControllerDelete,
    DishesControllerGetByCategory,
    DishesControllerGetBySUBCategory,
    DishesControllerGetCategories,
    DishesControllerGetSUBCategories,
    DishesControllerSearch,
} from './DishesController.js';

export const dishRouter = new Router();
export const dishesDefaultPath = '/api/restaurant/dishes';

dishRouter.post('/', validateSchema(dishesValidateSchema), DishesControllerCreate);
dishRouter.get('/', DishesControllerGetAll);
dishRouter.get('/by_category/:category', DishesControllerGetByCategory);
dishRouter.get('/by_category/:category/:subcategory', DishesControllerGetBySUBCategory);
dishRouter.get('/:id', DishesControllerGetOne);
dishRouter.get('/categories/all', DishesControllerGetCategories);
dishRouter.get('/categories/:category', DishesControllerGetSUBCategories);
dishRouter.get('/search/td', DishesControllerSearch);
dishRouter.put('/', DishesControllerUpdate);
dishRouter.delete('/:id', DishesControllerDelete);
