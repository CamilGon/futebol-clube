import UserConnection from './UserConnection';

export default class UserModel {
  private userModel = UserConnection;

  async getAllUsers() {
    const users = await this.userModel.findAll();
    return users;
  }

  async findUserByEmail(email: string) {
    const userData = await this.userModel.findOne({ where: { email } });
    return userData ? userData.dataValues : null;
  }
}
