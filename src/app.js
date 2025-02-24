import express from "express";
import { errorLogger } from "./middlewares/error-logger.js";
import { userRouter } from "./routes/user-route.js";
import { authRouter } from "./routes/auth-route.js";

const app = express();
const appPort = process.env.API_PORT || 3000;

app.use(express.json());
app.use("/api/v1", userRouter);
app.use("/api/v1", authRouter);
app.use(errorLogger);

app.listen(appPort, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log(`Server is running on port :${appPort}`);
  }
});
