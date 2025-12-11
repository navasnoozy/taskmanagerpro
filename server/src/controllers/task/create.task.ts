import { Request, Response } from "express";
import { Task } from "../../models/taskModel";
import { sendResponse } from "../../utils/sendResponse";

export const createTask = async (req: Request, res: Response) => {
  const { title, description, status, priority, dueDate } = req.body;

  const task = Task.build({
    title,
    description,
    status,
    priority,
    dueDate: dueDate ? new Date(dueDate) : undefined,
    userId: req.currentUser!.id,
  });

  await task.save();

  sendResponse(res, 201, { success: true, data: task });
};
