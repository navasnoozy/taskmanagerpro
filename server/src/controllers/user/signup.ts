import { Request, Response } from "express";
import { BadRequestError } from "../../errors";
import { sendResponse } from "../../utils/sendResponse";
import { User } from "../../models/userModel";
import { Session } from "../../models/sessionModel";
import jwt from "jsonwebtoken";

export const signupController = async (req: Request, res: Response) => {
  const body = req.body;
  const { name, email, password } = body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new BadRequestError("Email already in use", "email");
  }

  const newUser = User.build({
    name,
    email,
    password,
  });

  const user = await newUser.save();


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

  sendResponse(res, 201, { success: true, data: { email: user.email, accessToken: jwt_access_token } });
};
