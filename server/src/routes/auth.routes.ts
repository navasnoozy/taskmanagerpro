import express from "express";
import { currentUser } from "../middlewares/current-user";
import { validateRequest } from "../middlewares/validateRequest";
import { signinSchema, signupSchema } from "../schemas/auth.schema";
import {
  signupController,
  signinController,
  signoutController,
  currentUserController,
  refreshTokenController,
} from "../controllers/user";

const router = express.Router();

router.post("/signup", validateRequest(signupSchema), signupController);
router.post("/signin", validateRequest(signinSchema), signinController);

router.get("/signout", signoutController);

router.get("/currentuser", currentUser, currentUserController);

router.post("/refresh-token", refreshTokenController);

export { router as authRoutes };
