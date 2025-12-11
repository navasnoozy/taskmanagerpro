import { Request, Response } from "express";
import { Task } from "../../models/taskModel";
import { sendResponse } from "../../utils/sendResponse";

export const getTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  const task = await Task.findOne({ _id: id, userId: req.currentUser!.id });

  if (!task) {
    sendResponse(res, 404, { success: false, message: "Task not found" });
    return;
  }

  sendResponse(res, 200, { success: true, data: task });
};
