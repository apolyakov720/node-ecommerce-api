import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { pool } from "../configs/db.js";

const createUser = async (request, response, next) => {
  try {
    const errors = validationResult(request).errors;

    if (errors.length > 0) {
      return response
        .status(200)
        .json({ result: false, messages: [errors[0].msg] });
    }

    const { email, name, password } = request.body;

    const user = await pool
      .query("SELECT * FROM users WHERE email = $1", [email])
      .then((result) => result.rows[0]);

    if (user) {
      return response.status(200).json({
        result: false,
        messages: ["Такой пользователь уже существует"],
      });
    }

    const hashPassword = await bcrypt.hash(String(password), 10);

    await pool.query(
      "INSERT INTO users(name, password, email) VALUES($1, $2, $3) RETURNING *",
      [name, hashPassword, email]
    );

    response.status(200).json({
      result: true,
      messages: ["Пользователь успешно зарегистирован"],
    });
  } catch (error) {
    next(error);
  }
};

export { createUser };
