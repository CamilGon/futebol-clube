import * as jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'secretKey';

const validateToken = (token: string) => jwt.verify(token, SECRET_KEY);

export default validateToken;
