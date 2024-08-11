import { Request, Response, NextFunction } from 'express';

const ValidateLogin = (req: Request, res: Response, next: NextFunction) => {
  console.log('ValidateLogin middleware called');

  const { email, password } = req.body;

  console.log('Email:', email);
  console.log('Password:', password);
  if (!email || !password) {
    console.log('Missing email or password');
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const correctPassword = password.length >= 6;
  const correctEmail = regex.test(email);

  console.log('Correct Email Format:', correctEmail);
  console.log('Correct Password Length:', correctPassword);

  if (!correctPassword || !correctEmail) {
    console.log('Invalid email or password');
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  next();
};

export default ValidateLogin;
