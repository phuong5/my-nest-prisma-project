import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request from console...`, req.path, res.statusMessage);
  next();
}
