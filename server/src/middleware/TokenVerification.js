import jwt from "jsonwebtoken";
import { jwt_Token } from "../models/dotenv.js";
import { HandleResponse } from "../models/HandleRespond.js";

async function authmiddlware(req, res, next) {
  try {
    const authheader = req.headers["authorization"];
    const token = authheader && authheader.split(" ")[1];
    if (!token) {
      return HandleResponse(res, false, 401, "TOken not found");
    }
    const decodeToken = jwt.verify(token, jwt_Token);
    if (!decodeToken) {
      return HandleResponse(res, false, 403, "invalid Token");
    }
    req.user = decodeToken;
    next();
  } catch (error) {
    next(error);
  }
}

export default authmiddlware;

// {

//   "email":"testing@gmail.com",
//   "password":"testing123"
// }

// {

//   "description":"task man list",
//   "todo":"i cook"
// }

// http://localhost:9000/api/create
