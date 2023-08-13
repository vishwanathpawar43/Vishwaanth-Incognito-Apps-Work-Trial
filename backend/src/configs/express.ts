import { Router } from "express";
import { recognitionsRouter } from "routes";

export const router = Router();

router.use("/example", recognitionsRouter);
