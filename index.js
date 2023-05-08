import express from 'express';
import cors from 'cors';
import { tablesDefaultPath, tablesRouter } from './src/tables/routes.js';
import { orderDefaultPath, orderRouter } from './src/orders/orderRouter.js';
import { dishesDefaultPath, dishRouter } from './src/dishes/dishesRouter.js';

export const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(tablesDefaultPath, tablesRouter);
app.use(orderDefaultPath, orderRouter);
app.use(dishesDefaultPath, dishRouter);
