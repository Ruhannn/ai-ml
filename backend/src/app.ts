import cors from "cors";
import express, { json } from "express";
import { carsRouter } from "./routes/cars";
import { chatRouter } from "./routes/chat";

const app = express();

app.use(cors());
app.use(json());
app.use("/cars", carsRouter);
app.use("/chat", chatRouter);


export default app;
