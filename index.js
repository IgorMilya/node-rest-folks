import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path, { resolve } from "path";
import { tablesDefaultPath, tablesRouter } from "./src/tables/routes.js";
import { orderDefaultPath, orderRouter } from "./src/orders/orderRouter.js";
import { dishesDefaultPath, dishRouter } from "./src/dishes/dishesRouter.js";
import {
  categoriesDefaultPath,
  categoryRouter,
} from "./src/categories/CategoriesRouter.js";
import { billsDefaultPath, billsRouter } from "./src/bills/billsRouter.js";
import { userDefaultPath, usersRouter } from "./src/users/usersRouter.js";
import { readFile } from "fs";

export const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static(resolve(process.cwd(), "static")));
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, "
  );
  next();
});

app.get("/api/static/:dirName/:fileName", (req, res) => {
  const { dirName, fileName } = req.params;
  const filePath = path.join(process.cwd(), "static", dirName, fileName);
  readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).json({ svg: data });
    }
  });
});

app.use(tablesDefaultPath, tablesRouter);
app.use(orderDefaultPath, orderRouter);
app.use(dishesDefaultPath, dishRouter);
app.use(categoriesDefaultPath, categoryRouter);
app.use(billsDefaultPath, billsRouter);

app.use(userDefaultPath, usersRouter);
