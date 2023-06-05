import { Router } from "express";
import { UserController } from "./usersController.js";
import { uploadImageCloudinaryMiddleware } from "../middlewares/upload-image-cloudinary.middleware.js";

export const usersRouter = new Router();
export const userDefaultPath = "/api/users";

usersRouter.get("/", UserController.getAll);
usersRouter.get("/inLogin", UserController.getUsersLogin);
usersRouter.post(
  "/registration",
  uploadImageCloudinaryMiddleware,
  UserController.registration
);
usersRouter.post("/login", UserController.login);
usersRouter.post("/logout", UserController.logout);
usersRouter.get("/refresh", UserController.refresh);

usersRouter.get("/:userId", UserController.getByID);
usersRouter.post(
  "/:userId",
  uploadImageCloudinaryMiddleware,
  UserController.update
);
