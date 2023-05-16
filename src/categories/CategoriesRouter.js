import { Router } from 'express';
import validateSchema from '../utils/validation.js';
import { categoriesValidateSchema } from './validationsSchema.js';

import { CategoriesControllerCreate, CategoriesControllerGetAll, CategoriesControllerUpdate, CategoriesControllerDelete } from './CategoriesController.js';

export const categoryRouter = new Router();
export const categoriesDefaultPath = '/api/categories';

categoryRouter.post('/', validateSchema(categoriesValidateSchema), CategoriesControllerCreate);
categoryRouter.get('/', CategoriesControllerGetAll);
categoryRouter.put('/', CategoriesControllerUpdate);
categoryRouter.delete('/:id', CategoriesControllerDelete);
