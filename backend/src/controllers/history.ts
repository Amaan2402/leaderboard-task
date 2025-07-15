import mongoose from "mongoose";
import { ClaimHistory } from "../models/claimHistory";
import { Request, Response } from "express";

export const getClaimHistory = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const history = await ClaimHistory.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    { $sort: { claimedAt: -1 } },
    { $skip: skip },
    { $limit: limit },
    {
      $project: {
        _id: 0,
        name: "$user.name",
        points: "$pointsClaimed",
        claimedAt: 1,
      },
    },
  ]);

  return res.status(200).json({
    message: "Claim history fetched successfully",
    history: history,
    totalCount: await ClaimHistory.countDocuments(),
    currentPage: page,
    totalPages: Math.ceil((await ClaimHistory.countDocuments()) / limit),
  });
};
