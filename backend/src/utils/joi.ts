import Joi from "joi";

export const user = Joi.object({
  name: Joi.string().min(3).max(30).required(),
});

export const claimPoints = Joi.object()