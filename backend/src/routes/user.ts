import express from "express";
import {
  claimPoints,
  createUser,
  getLeaderBoard,
  getUsers,
} from "../controllers/user";
import { wrapAsync } from "../utils/wrapAsync";
const router = express.Router();

router.post("/", wrapAsync(createUser));
router.get("/", wrapAsync(getUsers));
router.post("/claim/:userId", wrapAsync(claimPoints));
router.get("/leaderboard", wrapAsync(getLeaderBoard));

export const userRoutes = router;
