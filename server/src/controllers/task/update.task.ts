import { Request, Response } from "express";
import { Task } from "../../models/taskModel";
import { sendResponse } from "../../utils/sendResponse";

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, status, priority, dueDate } = req.body;

  const task = await Task.findOneAndUpdate(
    { _id: id, userId: req.currentUser!.id },
    {
      title,
      description,
      status,
      priority,
      dueDate: dueDate ? new Date(dueDate) : undefined,
    },
    { new: true }
  );

  if (!task) {
    sendResponse(res, 404, { success: false, message: "Task not found" });
    return;
  }

  sendResponse(res, 200, { success: true, data: task });
};
