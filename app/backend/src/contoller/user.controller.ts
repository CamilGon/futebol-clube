import { Request, Response } from 'express';
import UserService from '../service/user.service';

class UserControllers {
  constructor(
    private userServiceLogin = new UserService(),
  ) {}

  async loginUser(req: Request, res: Response) {
    try {
      const loginInfo = req.body;
      const { data, status } = await this.userServiceLogin.loginUser(loginInfo);
      return res.status(status).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static getRole(req: Request, res: Response) {
    try {
      const { role } = req.body.user;
      return res.status(200).json({ role });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default UserControllers;
