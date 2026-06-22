import express from "express";

import authmiddlware from "../middleware/TokenVerification.js";
import {
  createTask,
  getUserTodos,
  deleteUserTodo,
  updateTodo,
  updateStatus,
} from "../controllers/TaskConroller.js";

const todoroute = express.Router();

todoroute.post("/create", authmiddlware, createTask);
todoroute.get("/gettodo", authmiddlware, getUserTodos);
todoroute.delete("/deletetodo/:id", authmiddlware, deleteUserTodo);
todoroute.put("/updatetodo/:id", authmiddlware, updateTodo);
todoroute.patch("/status/:id", authmiddlware, updateStatus);
export default todoroute;
