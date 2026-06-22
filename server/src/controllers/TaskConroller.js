import { HandleResponse } from "../models/HandleRespond.js";
import Task from "../models/TaskSchema.js";
import { Todo } from "../validator/validate.js";
import { formatDate } from "./formate.js";

export async function createTask(req, res, next) {
  try {
    const { description, todo } = req.body;
    const { error } = Todo.validate({ description, todo });
    const { userid } = req.user;

    if (error) {
      return HandleResponse(res, false, 400, error.details[0].message);
    }

    const task = await Task.create({
      description,
      todo,
      authoid: userid,
    });

    return HandleResponse(res, true, 200, "created successfully", task);
  } catch (error) {
    next(error);
  }
}

export async function getUserTodos(req, res, next) {
  try {
    const { userid } = req.user;

    const todos = await Task.find({ authoid: userid }).sort({ createdAt: -1 });

    const formatted = todos.map((todo) => ({
      _id: todo._id,
      description: todo.description,
      todo: todo.todo,
      status: todo.status,
      createdAt: formatDate(todo.createdAt),
      updatedAt: formatDate(todo.updatedAt),
    }));

    return HandleResponse(
      res,
      true,
      200,
      "Todos fetched successfully",
      formatted,
    );
  } catch (error) {
    next(error);
  }
}

export async function deleteUserTodo(req, res, next) {
  try {
    const { id } = req.params;
    const { userid } = req.user;

    const deleted = await Task.findOneAndDelete({
      _id: id,
      authoid: userid,
    });

    if (!deleted) {
      return HandleResponse(res, false, 404, "Task not found");
    }

    return HandleResponse(res, true, 200, "Deleted successfully", deleted);
  } catch (error) {
    next(error);
  }
}

export async function updateTodo(req, res, next) {
  try {
    const { id } = req.params;
    const { description, todo } = req.body;
    const { userid } = req.user;

    const { error } = Todo.validate({ description, todo });

    if (error) {
      return HandleResponse(res, false, 400, error.details[0].message);
    }

    const updated = await Task.findOneAndUpdate(
      { _id: id, authoid: userid },
      { description, todo },
      { new: true },
    );

    if (!updated) {
      return HandleResponse(res, false, 404, "Task not found");
    }

    return HandleResponse(res, true, 200, "Updated successfully", updated);
  } catch (error) {
    next(error);
  }
}

export async function updateStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const { userid } = req.user;

    const task = await Task.findOneAndUpdate(
      { _id: id, authoid: userid },
      { status },
      { new: true },
    );

    if (!task) {
      return HandleResponse(res, false, 404, "Task not found");
    }

    return HandleResponse(res, true, 200, "Status updated", task);
  } catch (err) {
    next(err);
  }
}
