import { Request, Response, NextFunction } from 'express';
import validateToken from '../utils/ValidateToken';

const ValidationToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || authorization === '') {
    return res.status(401).json({
      message: 'Token not found',
    });
  }
  const token = authorization.split(' ')[1];
  try {
    const user = validateToken(token);
    req.body = { ...req.body, user };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};
export default ValidationToken;
