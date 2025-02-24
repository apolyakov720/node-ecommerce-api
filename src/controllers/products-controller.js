import { pool } from "../configs/db.js";

const getProducts = async (request, response, next) => {
  try {
    const { limit, offset } = request.query;

    const products = await pool
      .query("SELECT * FROM products LIMIT $1 OFFSET $2", [
        limit,
        offset * limit,
      ])
      .then((result) => result.rows);

    response.status(200).json({ result: true, list: products });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (request, response, next) => {
  try {
    const { id } = request.params;

    const product = await pool
      .query("SELECT * FROM products WHERE id = $1", [id])
      .then((result) => result.rows[0]);

    response.status(200).json({ result: true, product });
  } catch (error) {
    next(error);
  }
};

export { getProducts, getProductById };
