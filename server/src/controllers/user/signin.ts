import { Request, Response } from "express";
import { BadRequestError } from "../../errors";
import { sendResponse } from "../../utils/sendResponse";
import { comparePassword } from "../../utils/hashPassword";
import jwt from "jsonwebtoken";
import { Session } from "../../models/sessionModel";
import { User } from "../../models/userModel";

export const signinController = async (req: Request, res: Response) => {
  const body = req.body;
  const { email, password } = body;

  const user = await User.findOne({ email });

  if (!user || !user.email) {
    throw new BadRequestError("Invalid Email id or password");
  }

  const isPasswordMatch = await comparePassword(password, user.password!);
  if (!isPasswordMatch) {
    throw new BadRequestError("Invalid Email id or password");
  }

  const jwt_access_token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_KEY!,
    { expiresIn: "1m" }
  );

  const jwt_refresh_token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_KEY!,
    { expiresIn: "4m" }
  );

  await Session.create({ userId: user._id, refreshToken: jwt_refresh_token, lastUsedAt: new Date() });

  res.cookie("refresh_token", jwt_refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/users/refresh-token",
  });

  sendResponse(res, 200, { success: true, data: { accessToken: jwt_access_token } });
};
