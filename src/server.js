import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import UserRouter from "./routes/UserRouter.js";
import ProductRouter from "./routes/ProductRouter.js";
import AuthRouter from "./routes/AuthRouter.js";
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
  })
);
app.use(express.json());

app.use("/users", UserRouter);
app.use("/products", ProductRouter);
app.use("/auth", AuthRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
