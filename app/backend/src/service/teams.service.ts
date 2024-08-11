import TeamsModel from '../database/models/TeamsModel';

class TeamsService {
  private teamsModel: TeamsModel;

  constructor() {
    this.teamsModel = new TeamsModel();
  }

  async getAllTeams() {
    try {
      const teams = await this.teamsModel.getAllTeams();
      return teams;
    } catch (error) {
      throw new Error('Failed to fetch teams');
    }
  }

  async getTeamById(id: string) {
    try {
      const teamName = await this.teamsModel.getTeamById(id);
      return teamName;
    } catch (error) {
      throw new Error('Failed to fetch team by id');
    }
  }
}

export default TeamsService;
