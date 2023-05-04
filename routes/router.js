import Router from 'express';

import { DishesControllerCreate, DishesControllerGetAll, DishesControllerGetOne, DishesControllerUpdate, DishesControllerDelete } from '../dishes/DishesController.js';
import { TablesControllerCreate, TablesControllerGetAll, TablesControllerGetOne, TablesControllerUpdate, TablesControllerDelete } from '../tables/TablesController.js';

const router = new Router();

router.post('/dishes', DishesControllerCreate);
router.get('/dishes', DishesControllerGetAll);
router.get('/dishes/:id', DishesControllerGetOne);
router.put('/dishes', DishesControllerUpdate);
router.delete('/dishes/:id', DishesControllerDelete);

router.post('/tables', TablesControllerCreate);
router.get('/tables', TablesControllerGetAll);
router.get('/tables/:id', TablesControllerGetOne);
router.put('/tables', TablesControllerUpdate);
router.delete('/tables/:id', TablesControllerDelete);

export default router;
