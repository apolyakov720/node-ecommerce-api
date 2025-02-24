import express from "express";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import {
  getProducts,
  getProductById,
} from "../controllers/products-controller.js";

const productsRouter = express.Router();

productsRouter.get("/products", authMiddleware, getProducts);
productsRouter.get("/products/:id", authMiddleware, getProductById);

export { productsRouter };
