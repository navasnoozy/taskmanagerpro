import { Response } from "express";

export const sendResponse = (res: Response, statusCode: number, data: object) => {
  res.status(statusCode).json(data);
};
