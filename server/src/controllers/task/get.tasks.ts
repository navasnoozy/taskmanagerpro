import { Request, Response } from "express";
import { Task } from "../../models/taskModel";
import { sendResponse } from "../../utils/sendResponse";

export const getTasks = async (req: Request, res: Response) => {
  const tasks = await Task.find({ userId: req.currentUser!.id });

  sendResponse(res, 200, { success: true, data: tasks });
};
