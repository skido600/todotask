import express from "express";
import { Signup, Login } from "../controllers/authControllers.js";
import authmiddlware from "../middleware/TokenVerification.js";

const router = express.Router();

router.post("/createuser", Signup);
router.post("/loginuser", Login);
export default router;
