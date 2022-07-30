import app from "./app.js";

import { connectDB } from "./config/db.js";
// import "dotenv/config";
import dotenv from "dotenv";
dotenv.config();

const DB_URL = process.env.DB_URL;
connectDB(DB_URL);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
