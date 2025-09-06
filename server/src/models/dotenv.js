import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT;
const MONGODB_URL = process.env.MONGO_URL;
const gensalt = process.env.GENSALT;
const jwt_Token = process.env.JWT_SEC;
export { port, MONGODB_URL, gensalt, jwt_Token };
