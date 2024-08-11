import MatchBody from '../types/MatchBody';
import MatchesModel from '../database/models/Matches.model';
import TeamsModel from '../database/models/TeamsModel';

class MatchesServices {
  constructor(
    private matchesModel = new MatchesModel(),
    private teamsModel = new TeamsModel(),
  ) {}

  async getAllMatchesService() {
    const data = await this.matchesModel.getAllMatches();
    return { data, status: 200 };
  }

  async getAllMatchesInProgress() {
    const data = await this.matchesModel.getAllMatchesInProgress();
    return { data, status: 200 };
  }

  async getAllMatchesFinishedService() {
    const data = await this.matchesModel.getAllMatchesFinished();
    return { data, status: 200 };
  }

  async getfinishMatchService(id: string) {
    await this.matchesModel.finishMatch(id);
    return { data: { message: 'Finished' }, status: 200 };
  }

  async updateMatchService(id: string, homeTeamGoals: number, awayTeamGoals: number) {
    await this.matchesModel.updateMatch(id, homeTeamGoals, awayTeamGoals);
    return { data: { message: 'Match updated!' }, status: 200 };
  }

  async addMatchService(body: MatchBody) {
    const { homeTeamId, awayTeamId } = body;
    if (homeTeamId === awayTeamId) {
      return { data: { message: 'It is not possible to create a match with two equal teams' },
        status: 422 };
    }
    const homeTeamExists = await this.teamsModel.getTeamById(String(homeTeamId));
    const awayTeamExists = await this.teamsModel.getTeamById(String(awayTeamId));
    if (!homeTeamExists || !awayTeamExists) {
      return { data: { message: 'There is no team with such id!' }, status: 404 };
    }
    const data = await this.matchesModel
      .addMatch(body);
    return { data, status: 201 };
  }
}

export default MatchesServices;
