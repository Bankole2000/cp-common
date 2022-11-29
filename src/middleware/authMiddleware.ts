// import { NextFunction, Request, Response } from 'express';
// import { ServiceResponse } from '../@types/ServiceResponse';
import JWT from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const signJWT = async (payload: any, secret: string, options?: JWT.SignOptions | undefined) => {
  try {
    return {
      error: null,
      token: JWT.sign(payload, secret, { ...(options && options) }),
    };
  } catch (error: any) {
    console.log({ error });
    return {
      error,
      token: null,
    };
  }
};

export const verifyToken = async (token: string, secret: string) => {
  if (!token) {
    return {
      error: 'No token provided',
      decoded: null,
      valid: false,
      expired: false,
    };
  }
  try {
    const decoded = JWT.verify(token, secret);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    console.log({ error });
    return {
      error,
      decoded: null,
      valid: false,
      expired: error.message === 'jwt expired',
    };
  }
};

export const verifyPassword = async (attemptedPassword: string, hashedPassword: string) => bcrypt.compareSync(attemptedPassword, hashedPassword);

export const hashPassword = async (password: string) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
};
