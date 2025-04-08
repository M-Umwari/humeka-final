import { Request, Response, NextFunction } from 'express';
import { IUser } from '../user'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { AppDataSource } from '../data-source';
import User from '../entities/User';
dotenv.config()

interface Decoded {
    user: IUser
}

const userRepository = AppDataSource.getRepository(User)

export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.header('Authorization');
  if (!header) {
    return res.status(401).json({ status: 'error', message: 'Unauthorized' });
  }

  const token = header.split(' ')[1];

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET as string) as Decoded;
    const user = await userRepository.findOneBy({id: decoded.user.id, active:true})
    if(!user){
        return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }

    req.user = user

    next();
  } catch (err) {
    return res.status(401).json({ status: 'error', message: 'Session expired. Please login again' });
  }
};

export const restrictToRole = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const userRole = req.user!.role
      if(!allowedRoles.includes(userRole)){
          return res.status(403).json({message:'Forbidden'})
      }
      next()
    }
}