import { CreationOptional, DataTypes, InferAttributes,
  InferCreationAttributes, Model } from 'sequelize';

import db from '.';

export default class TeamsConection
  extends Model<InferAttributes<TeamsConection>,
  InferCreationAttributes<TeamsConection>
  > {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

TeamsConection.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  teamName: {
    type: DataTypes.STRING, allowNull: false,
  },
}, {
  sequelize: db,
  tableName: 'teams',
  timestamps: false,
  underscored: true,
});
