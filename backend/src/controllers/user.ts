import { Request, Response } from "express";
import { User } from "../models/user";
import { CustomError } from "../utils/CustomError";
import { user } from "../utils/joi";
import mongoose from "mongoose";
import { ClaimHistory } from "../models/claimHistory";
import { getIo } from "../socket";

const getRandomPoints = () => {
  return Math.floor(Math.random() * 10) + 1;
};

const isValidObjectId = (id: string) =>
  mongoose.Types.ObjectId.isValid(id) &&
  new mongoose.Types.ObjectId(id).toString() === id;

const isUserExists = async (identifier: string) => {
  try {
    let query;

    if (isValidObjectId(identifier)) {
      query = { _id: identifier };
    } else {
      query = { name: identifier };
    }

    const user = await User.findOne(query);
    return user || null;
  } catch (error) {
    throw new CustomError("Database error", 500);
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { error } = user.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  const { name }: { name: string } = req.body;
  const filteredName = name.trim().toLowerCase();

  const userDb = await isUserExists(filteredName);
  if (userDb) {
    throw new CustomError("User already exists", 400);
  }

  const newUser = new User({ name: filteredName });
  newUser.save();

  res.status(201).json({
    message: "User created successfully",
    user: {
      id: newUser._id,
      name: newUser.name,
      totalPoints: 0,
    },
  });
};

export const getUsers = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const users = await User.aggregate([
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $skip: skip,
    },
    { $limit: limit },
    {
      $project: {
        _id: 1,
        name: 1,
        totalPoints: 1,
        createdAt: 1,
      },
    },
  ]);

  return res.status(200).json({
    message: "Users fetched successfully",
    users,
    totalCount: await User.countDocuments(),
    currentPage: page,
    totalPages: Math.ceil((await User.countDocuments()) / limit),
  });
};

export const claimPoints = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const session = mongoose.startSession();

  const userDb = await isUserExists(userId);
  if (!userDb) {
    throw new CustomError("User not found", 404);
  }

  const points = getRandomPoints();

  (await session).startTransaction();

  userDb.totalPoints += points;

  const userClaimHistory = new ClaimHistory({
    userId: userDb._id,
    pointsClaimed: points,
  });

  await userClaimHistory.save();
  await userDb.save();

  const io = getIo();

  if (io) {
    io.emit("pointsClaimed", {
      name: userDb.name,
      pointsClaimed: points,
    });
  }
  (await session).commitTransaction();
  (await session).endSession();

  res.status(200).json({
    message: "Points claimed successfully",
    user: {
      id: userDb._id,
      name: userDb.name,
      totalPoints: userDb.totalPoints,
    },
    pointsClaimed: points,
  });
};

export const getLeaderBoard = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const users = await User.aggregate([
    {
      $sort: {
        totalPoints: -1,
      },
    },
    {
      $match: {
        totalPoints: { $gt: 0 },
      },
    },
    {
      $skip: skip,
    },
    { $limit: limit },
    {
      $project: {
        _id: 1,
        name: 1,
        totalPoints: 1,
      },
    },
  ]);

  if (users.length === 0) {
    return res.status(200).json({
      message: "No users found in the leaderboard",
      users: [],
      totalCount: 0,
      currentPage: page,
      totalPages: Math.ceil((await User.countDocuments()) / limit),
    });
  }

  const usersWithRank = users.map((user, idx) => ({
    ...user,
    rank: skip + idx + 1,
  }));

  return res.status(200).json({
    message: "Leaderboard fetched successfully",
    users: usersWithRank,
    totalCount: await User.countDocuments(),
    currentPage: page,
    totalPages: Math.ceil((await User.countDocuments()) / limit),
  });
};
