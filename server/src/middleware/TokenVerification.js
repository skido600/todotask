import jwt from "jsonwebtoken";
import { jwt_Token } from "../models/dotenv.js";
import { HandleResponse } from "../models/HandleRespond.js";

async function authmiddlware(req, res, next) {
  try {
    const authheader = req.headers["authorization"];
    const token = authheader && authheader.split("")[1];
    if (!token) {
      return HandleResponse(res, "TOken not found");
    }
    const decodeToken = jwt.verify(token, jwt_Token);
    if (!decodeToken) {
      return HandleResponse(res, "invalid Token");
    }
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
}

export default authmiddlware;
