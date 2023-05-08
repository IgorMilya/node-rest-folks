import Router from 'express'
import validateSchema from '../utils/validation.js'
import { dishesValidateSchema } from '../dishes/validationsSchema.js'
import { ordersValidateSchema } from '../orders/validationsSchema.js'

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
} from '../dishes/DishesController.js'

import {
  OrdersControllerCreate,
  OrdersControllerGetAll,
  OrdersControllerGetOne,
  OrdersControllerUpdate,
  OrdersControllerDelete,
} from '../orders/OrdersController.js'

const router = new Router()

router.post('/dishes', validateSchema(dishesValidateSchema), DishesControllerCreate)
router.get('/dishes', DishesControllerGetAll)
router.get('/dishes/by_category/:category', DishesControllerGetByCategory)
router.get('/dishes/by_category/:category/:subcategory', DishesControllerGetBySUBCategory)
router.get('/dishes/:id', DishesControllerGetOne)
router.get('/dishes/categories/all', DishesControllerGetCategories)
router.get('/dishes/categories/:category', DishesControllerGetSUBCategories)
router.put('/dishes', DishesControllerUpdate)
router.delete('/dishes/:id', DishesControllerDelete)

router.post('/orders', validateSchema(ordersValidateSchema), OrdersControllerCreate)
router.get('/orders', OrdersControllerGetAll)
router.get('/orders/:id', OrdersControllerGetOne)
router.put('/orders', OrdersControllerUpdate)
router.delete('/orders/:id', OrdersControllerDelete)

export default router
