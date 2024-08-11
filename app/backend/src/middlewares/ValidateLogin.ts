import { Request, Response, NextFunction } from 'express';

const ValidateLogin = (req: Request, res: Response, next: NextFunction) => {
  console.log('ValidateLogin middleware called'); // Log inicial para verificar se o middleware é chamado

  const { email, password } = req.body;

  console.log('Email:', email); // Log do valor do email
  console.log('Password:', password); // Log do valor da senha

  if (!email || !password) {
    console.log('Missing email or password'); // Log se faltarem email ou senha
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const correctPassword = password.length >= 6;
  const correctEmail = regex.test(email);

  console.log('Correct Email Format:', correctEmail); // Log para verificar o formato do email
  console.log('Correct Password Length:', correctPassword); // Log para verificar o comprimento da senha

  if (!correctPassword || !correctEmail) {
    console.log('Invalid email or password'); // Log se o email ou a senha forem inválidos
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  next(); // Prossegue para o próximo middleware ou controlador
};

export default ValidateLogin;
