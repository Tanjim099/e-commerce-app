import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import dbConnection from "./config/db.js";
import userRouters from "./routes/authRoute.js";
import productRoutes from "./routes/productRoute.js";
import orderRoutes from "./routes/orderRoute.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

const coreOptions = {
    origin: "http://127.0.0.1:5173/",
    credentials: true,
    optionsSuccessStatus: 204,
}

app.use(cors(coreOptions));
app.use(morgan("dev"));
app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = 5000;

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is running"
    })
})

app.use("/api/v1/user", userRouters);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/order", orderRoutes);

dbConnection();

app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
})
