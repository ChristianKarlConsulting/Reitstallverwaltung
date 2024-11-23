import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return res.status(409).json({
        message: 'Ein Eintrag mit diesen Daten existiert bereits',
      });
    }
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      message: 'Validierungsfehler',
      errors: error.errors,
    });
  }

  return res.status(500).json({
    message: 'Ein interner Serverfehler ist aufgetreten',
  });
};