import { getRecognitions } from "controllers/example";
import { Router } from "express";

export const recognitionsRouter = Router();

recognitionsRouter.get("/", getRecognitions);
