import * as bcrypt from 'bcryptjs';
import GenerateToken from '../utils/GenerateToken';
import UserModel from '../database/models/User.model';

class UserService {
  constructor(
    private userModel = new UserModel(),
  ) {}

  async loginUser(loginData: { email: string, password: string }) {
    const { email, password } = loginData;

    const userData = await this.userModel.findUserByEmail(email);

    if (!userData) {
      return { data: { message: 'Invalid email or password' }, status: 401 };
    }

    const passwordOK = bcrypt.compareSync(password, userData.password);

    if (passwordOK) {
      const { id, username, role } = userData;
      const token = GenerateToken({ id, username, role });
      return { data: { token }, status: 200 };
    }
    return { data: { message: 'Invalid email or password' }, status: 401 };
  }
}

export default UserService;
