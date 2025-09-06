import express from "express";
import { port } from "./models/dotenv.js";
import connectDb from "./models/connectdb.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import HandleError from "./middleware/HandleError.js";
import authroute from "./routes/authroute.js";
//server
const server = express();

//middleware
server.use(express.json());
server.use(cors());
server.use(cookieParser());
server.use("/auth", authroute);
//listen
//Error handling middleware
server.use(HandleError);
server.listen(port, async () => {
  await connectDb();
  console.log(`server running on port ${port}`);
});
