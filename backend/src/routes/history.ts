import express from "express";
import { wrapAsync } from "../utils/wrapAsync";
import { getClaimHistory } from "../controllers/history";
const router = express.Router();

router.get("/", wrapAsync(getClaimHistory));

export const historyRoutes = router;
