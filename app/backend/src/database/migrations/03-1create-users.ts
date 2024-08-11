import { DataTypes, Model, QueryInterface } from "sequelize"
import  iUsers from "../../Interfaces/IUsers";


export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<iUsers>>('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      }
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('users');
  },
}
