import jwt from "jsonwebtoken";

const authMiddleware = async (request, response, next) => {
  try {
    const token = request.cookies.token;

    if (!token) {
      return response.status(401).json({ result: false });
    }

    const decoded = jwt.verify(token, process.env.API_SECRET_KEY);

    request.user = decoded;

    next();
  } catch (error) {
    console.error(error);

    return response.status(401).json({ result: false });
  }
};

export { authMiddleware };
