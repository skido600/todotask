import mongoose from "mongoose";

const TaskManager = mongoose.Schema(
  {
    description: {
      type: String,
    },

    todo: {
      type: String,
    },
    authoid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("task", TaskManager);

export default Task;
