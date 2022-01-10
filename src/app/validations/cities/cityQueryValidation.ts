import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export default async (req:Request, res:Response, next:NextFunction) => {
  try {
    const schema = Joi.object({
      limit: Joi.number().min(1),
      page: Joi.number().min(1),
      cidade: Joi.string().min(1),
      estado: Joi.string().min(1),
    });

    const { error } = schema.validate(req.query, { abortEarly: false });
    if (error) throw error;
    return next();
  } catch (error) {
    return next(error);
  }
};
