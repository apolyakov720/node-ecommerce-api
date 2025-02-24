import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { pool } from "../configs/db.js";

const login = async (request, response, next) => {
  try {
    const errors = validationResult(request).errors;

    if (errors.length > 0) {
      return response
        .status(200)
        .json({ result: false, messages: [errors[0].msg] });
    }

    const { email, password } = request.body;

    const user = await pool
      .query("SELECT * FROM users WHERE email = $1", [email])
      .then((result) => result.rows[0]);

    if (!user) {
      return response.status(401).json({
        result: false,
        messages: [
          "Пользователя с таким e-mail не существует",
          "Вначале зарегистрируйтесь",
        ],
      });
    }

    const isValidPassword = await bcrypt.compare(
      String(password),
      user.password
    );

    if (!isValidPassword) {
      return response.status(401).json({
        result: false,
        messages: ["Неверно указан пароль", "Повторите попытку"],
      });
    }

    const JWT = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      process.env.API_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    response
      .cookie("token", JWT, { httpOnly: true, secure: false })
      .status(200)
      .json({ result: true });
  } catch (error) {
    next(error);
  }
};

const logout = async (_, response, next) => {
  try {
    response.clearCookie("token").status(200).json({ result: true });
  } catch (error) {
    next(error);
  }
};

export { login, logout };
