import { toNodeHandler } from "better-auth/node";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { currentUser } from "./middlewares/current-user";
import { errorHandler } from "./middlewares/errorHandler";
import { authRoutes } from "./routes/auth.routes";
import { taskRoutes } from "./routes/task.routes";
import { NotFoundError } from "./errors";

dotenv.config();

export const createApp = async () => {
  const { auth } = await import("./config/auth");

  const app = express();

  app.use(currentUser);

  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:4173",
      ],
      credentials: true,
    })
  );

  app.all("/api/auth/*splat", toNodeHandler(auth));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.set("trust proxy", true);

  app.use("/api/users", authRoutes);
  app.use("/api/tasks", taskRoutes);

  app.all("*path", async () => {
    throw new NotFoundError();
  });

  app.use(errorHandler);

  return app;
};
