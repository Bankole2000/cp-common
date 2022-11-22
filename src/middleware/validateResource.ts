import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';
import { ServiceResponse } from '../@types/ServiceResponse';

export const validate = (schema: AnyZodObject, schemaName: string) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (error: any) {
    const serviceResponse = new ServiceResponse(
      `${schemaName} validation failed`,
      null,
      false,
      400,
      `Invalid ${schemaName} Data`,
      error.errors
    );
    return res.status(serviceResponse.statusCode).send(serviceResponse);
  }
};
