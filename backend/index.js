import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet  from "helmet";
import morgan from "morgan";
import path from 'path';
const __dirname = path.resolve();
import { dbCollection } from "./db/config.js";
import authRoute from "./routes/authRoute.js";
import postRoutes from "./routes/postRoutes.js";

const app = express();
app.use(cors())

dotenv.config();
// app.use(helmet());
// app.use(morgan("common"))
app.use(express.json())
dbCollection();


app.use("/api/v1", authRoute);
app.use("/api/posts", postRoutes);
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: ' http://localhost:3001/api/posts/timeline/all', credentials: true }))


const PORT = process.env.PORT || 3001;
app.listen(PORT, "localhost")
app.listen(PORT, ()=>{
    console.log(`App is creating on the port ${PORT}`);
});
