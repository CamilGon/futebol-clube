import { Router } from 'express';
import ValidateLogin from '../middlewares/ValidateLogin';
import ValidationToken from '../middlewares/ValidateToken';
import UserControllers from '../contoller/user.controller';

const UserRoutes = Router();

const loginController = new UserControllers();

UserRoutes.post('/login', ValidateLogin, (req, res) => loginController.loginUser(req, res));

UserRoutes.get('/login/role', ValidationToken, (req, res) => UserControllers.getRole(req, res));

export default UserRoutes;
