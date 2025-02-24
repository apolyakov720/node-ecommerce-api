import express from "express";
import { check } from "express-validator";
import { createUser } from "../controllers/user-controller.js";

const userRouter = express.Router();

userRouter.post(
  "/user",
  [
    check("name", "Пожалуйста, укажите Ваше имя").not().isEmpty(),
    check("password", "Пожалуйста, придумайте пароль").not().isEmpty(),
    check("email", "Пожалуйста, укажите ваш e-mail").isEmail(),
    check("confirmPassword", "Пожалуйста, повторите пароль")
      .not()
      .isEmpty()
      .custom((value, { req }) => {
        return value === req.body.password;
      })
      .withMessage("Пароли не совпадают"),
  ],
  createUser
);

export { userRouter };
