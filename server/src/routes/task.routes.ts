import express from "express";
import { require_auth } from "../middlewares/require-auth";
import { validateRequest } from "../middlewares/validateRequest";
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema";
import { createTask, getTasks, getTask, updateTask, deleteTask } from "../controllers/task";

const router = express.Router();

router.use(require_auth);

router.post("/", validateRequest(createTaskSchema), createTask);
router.get("/", getTasks);
router.get("/:id", getTask);
router.patch("/:id", validateRequest(updateTaskSchema), updateTask);
router.delete("/:id", deleteTask);

export { router as taskRoutes };
