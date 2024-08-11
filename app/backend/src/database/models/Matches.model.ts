import MatchBody from '../../types/MatchBody';
import MatchesConnection from './Matches.connection';
import TeamsConnection from './TeamsConnection';

class MatchesModel {
  private matchesModel = MatchesConnection;

  async getAllMatches() {
    const getAllMatchesArray = await this.matchesModel.findAll({
      include: [
        {
          model: TeamsConnection,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: TeamsConnection,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
    return getAllMatchesArray;
  }

  async getMatcheById(id: string) {
    const match = await this.matchesModel.findByPk(id);
    return match;
  }

  async getAllMatchesFinished() {
    const getMatchesFinished = await this.matchesModel.findAll({
      where: { inProgress: false },
      include: [
        {
          model: TeamsConnection,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: TeamsConnection,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
    return getMatchesFinished;
  }

  async getAllMatchesInProgress() {
    const allMatchesInProgress = await this.matchesModel.findAll({
      where: { inProgress: true },
      include: [
        {
          model: TeamsConnection,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: TeamsConnection,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
    return allMatchesInProgress;
  }

  async finishMatch(id: string) {
    await this.matchesModel.update({ inProgress: false }, { where: { id } });
    return { message: 'Partida finalizada com sucesso!' };
  }

  async updateMatch(id: string, homeTeamGoals: number, awayTeamGoals: number) {
    await this.matchesModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return { message: 'Partida att com sucesso!' };
  }

  async addMatch(body: MatchBody) {
    const newMatch = await this.matchesModel.create({ ...body, inProgress: true });
    return newMatch;
  }
}

export default MatchesModel;
