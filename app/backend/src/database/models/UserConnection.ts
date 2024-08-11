import { CreationOptional, DataTypes, InferAttributes,
  InferCreationAttributes, Model } from 'sequelize';

import db from '.';

export default class UserConnection
  extends Model<InferAttributes<UserConnection>,
  InferCreationAttributes<UserConnection>> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}
UserConnection.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  tableName: 'users',
  timestamps: false,
});
