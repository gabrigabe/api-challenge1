import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { serializer } from '../../utils/errorSerializer';
import { Gender } from '../../utils/genderEnum';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            full_name: Joi.string().min(1).trim().required(),
            gender: Joi.string()
                .valid(...Object.keys(Gender))
                .required(),
            birthdate: Joi.date().required(),
            city_id: Joi.string().uuid().required()
        });

        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) throw error;
        return next();
    } catch (error) {
        return next(serializer(error));
    }
};
