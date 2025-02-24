import express from "express";
import { check } from "express-validator";
import { login, logout } from "../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.post(
  "/login",
  [
    check("email", "E-mail обязателен").isEmail(),
    check("password", "Пароль обязателен").not().isEmpty(),
  ],
  login
);

authRouter.post("/logout", logout);

export { authRouter };
