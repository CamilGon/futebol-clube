import { DataTypes, Model, InferAttributes,
  InferCreationAttributes, CreationOptional,
} from 'sequelize';
import db from '.';
import TeamsConection from './TeamsConnection';

class MatchesConection extends Model<InferAttributes<MatchesConection>,
InferCreationAttributes<MatchesConection>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
  declare homeTeam?: {
    teamName: string,
  };

  declare awayTeam?: {
    teamName: string,
  };
}

MatchesConection.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_id',
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_id',
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'in_progress',
  },
}, {
  sequelize: db,
  modelName: 'matches',
  underscored: true,
  timestamps: false,
});

MatchesConection.belongsTo(TeamsConection, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});

MatchesConection.belongsTo(TeamsConection, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

export default MatchesConection;
