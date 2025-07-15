import mongoose from "mongoose";

const Schema = mongoose.Schema;

const claimHistorySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  pointsClaimed: {
    type: Number,
    required: true,
  },
  claimedAt: {
    type: Date,
    default: Date.now,
  },
});

export const ClaimHistory = mongoose.model("ClaimHistory", claimHistorySchema);
