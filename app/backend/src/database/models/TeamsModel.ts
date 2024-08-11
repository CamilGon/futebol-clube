import TeamsConection from './TeamsConnection';

export default class TeamsModel {
  private teamsModel = TeamsConection;

  async getAllTeams() {
    const listTeamsArray = await this.teamsModel.findAll();
    return listTeamsArray;
  }

  async getTeamById(id: string) {
    const team = await this.teamsModel.findOne({ where: { id } });
    return team ? { id: team.id, teamName: team.teamName } : null;
  }
}
