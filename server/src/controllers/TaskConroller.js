import { HandleResponse } from "../models/HandleRespond.js";
import Task from "../models/TaskSchema.js";
import { Todo } from "../validator/validate.js";
import { formatDate } from "./formate.js";

async function createTask(req, res, next) {
  try {
    const { description, todo } = req.body;
    const { error } = Todo.validate({ description, todo });
    const { userid } = req.user;

    if (error) {
      return HandleResponse(res, false, 400, error.details[0].message);
    }
    const todolist = await Task.create({
      description,
      todo,
      authoid: userid,
    });
    return HandleResponse(res, true, 200, "created succesfully", todolist);
  } catch (error) {
    next(error);
  }
}

async function getUserTodos(req, res, next) {
  try {
    const { userid } = req.user;

    const todos = await Task.find({ authoid: userid }).sort({ createdAt: -1 });
    const formattedTodos = todos.map((todo) => ({
      _id: todo._id,
      description: todo.description,
      todo: todo.todo,
      createdAt: formatDate(todo.createdAt),
      updatedAt: formatDate(todo.updatedAt),
      authoid: todo.authoid,
    }));

    return HandleResponse(
      res,
      true,
      200,
      "Todos fetched successfully",
      formattedTodos
    );
  } catch (error) {
    next(error);
  }
}

async function deleteUserTodo(req, res, next) {
  try {
    const { id } = req.params;
    const { userid } = req.user;

    const deletedTodo = await Task.findOneAndDelete({
      _id: id,
      authoid: userid,
    });

    if (!deletedTodo) {
      return HandleResponse(
        res,
        false,
        404,
        "cannot  found or you cannot delete it"
      );
    }

    return HandleResponse(res, true, 200, " deleted successfully", deletedTodo);
  } catch (error) {
    next(error);
  }
}
async function updateTodo(req, res, next) {
  try {
    const { id } = req.params;
    const { description, todo } = req.body;
    const { userid } = req.user;
    const { error } = Todo.validate({ description, todo });

    if (error) {
      return HandleResponse(res, false, 400, error.details[0].message);
    }
    const updatedTodo = await Task.findOneAndUpdate(
      { _id: id, authoid: userid },
      { description, todo },
      { new: true }
    );

    if (!updatedTodo) {
      return HandleResponse(
        res,
        false,
        404,
        "Todo not found or you cannot update it"
      );
    }

    const formattedTodo = {
      _id: updatedTodo._id,
      description: updatedTodo.description,
      todo: updatedTodo.todo,
      createdAt: formatDate(updatedTodo.createdAt),
      updatedAt: formatDate(updatedTodo.updatedAt),
      authoid: updatedTodo.authoid,
    };

    return HandleResponse(
      res,
      true,
      200,
      "Todos fetched successfully",
      formattedTodo
    );
  } catch (error) {
    next(error);
  }
}
export { createTask, getUserTodos, deleteUserTodo, updateTodo };
