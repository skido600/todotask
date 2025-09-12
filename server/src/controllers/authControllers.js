import { gensalt, jwt_Token } from "../models/dotenv.js";
import { HandleResponse } from "../models/HandleRespond.js";
import User from "../models/UserSchema.js";
import { SignupVal, LoginVal } from "../validator/validate.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const { error } = SignupVal.validate({
      username,
      email,
      password,
    });
    if (error) {
      return HandleResponse(res, false, 400, error.details[0].message);
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return HandleResponse(
        res,
        false,
        400,
        "User with this email already exists"
      );
    }

    const salt = bcrypt.genSaltSync(Number(gensalt));
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });
    await newUser.save();
    return HandleResponse(
      res,
      true,
      201,
      `User ${newUser.username} successfully created`
    );
  } catch (error) {
    next(error);
  }
};

const Login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const { error } = LoginVal.validate({
      email,
      password,
    });
    if (error) {
      return HandleResponse(res, false, 400, error.details[0].message);
    }
    const userdetails = await User.findOne({ email });
    if (!userdetails) {
      return HandleResponse(res, false, 404, "User email not found");
    }
    const isMatch = await bcrypt.compare(password, userdetails.password);
    if (!isMatch) {
      return HandleResponse(res, false, 401, "Invalid credentials");
    }

    const token = jwt.sign(
      {
        username: userdetails.username,
        userid: userdetails._id,
        email: userdetails.email,
      },
      jwt_Token,
      { expiresIn: "30mins" }
    );

    if (!token) {
      return HandleResponse(res, false, 404, "TOken not found");
    }

    return HandleResponse(res, true, 200, `user Login successfully`, token);
  } catch (error) {
    next(error);
  }
};

export { Signup, Login };
