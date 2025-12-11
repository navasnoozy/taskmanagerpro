import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { cookieOptions } from "../../config/cookieOptions";

export const signoutController = (req: Request, res: Response) => {
  res.clearCookie("refresh_token", cookieOptions);
  sendResponse(res, 200, { success: true });
};
