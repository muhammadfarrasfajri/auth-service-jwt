import express from "express";
import userController from "../controller/user-controller.js";
import productController from "../controller/product-controller.js";
import authController from "../controller/auth-controller.js";
import { authenticateToken } from "../middleware/token-auth-middleware.js";
import { accessUserOrAdmin } from "../middleware/updateuser-middleware.js";
import { adminOnly } from "../middleware/admin-only-middleware.js";

const userRouter = express.Router();
userRouter.use(authenticateToken);

// User Api
userRouter.get("/api/users/:username", userController.get);
userRouter.get("/api/users", userController.search);
userRouter.post("/api/users", userController.create); 
userRouter.patch("/api/users/:username", accessUserOrAdmin, userController.update);
userRouter.delete("/api/users/:username",adminOnly, userController.remove);

// Rerfresh token Api
userRouter.post("/api/users/refresh", authController.refreshToken);

//logout Api
userRouter.post("/api/users/logout", authController.logout);

//Product Api
userRouter.get("/api/users/:username/products", productController.list);
userRouter.get("/api/users/:username/products/:uuid", productController.get);
userRouter.post("/api/users/:username/products", productController.create);
userRouter.patch("/api/users/:username/products/:uuid", accessUserOrAdmin, productController.update);
userRouter.delete("/api/users/:username/products/:uuid", accessUserOrAdmin,productController.remove);

export { userRouter };
