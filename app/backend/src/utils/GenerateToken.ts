import * as jwt from 'jsonwebtoken';
import User from '../types/User';

const SECRET_KEY = process.env.JWT_SECRET || 'secretKey';

const GenerateToken = ({ id, username, role }: User): string =>
  jwt.sign({ id, username, role }, SECRET_KEY);

export default GenerateToken;
