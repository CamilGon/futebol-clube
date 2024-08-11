import Definition from '../types/Definition';
import BoardTeamData from '../types/BoardTeamData';
import IMatches from '../Interfaces/IMatches';
import CountScore from '../utils/CountScore';
import TeamsModels from '../database/models/TeamsModel';
import MatchesModels from '../database/models/Matches.model';

class LeaderBoardServices {
  constructor(
    private teamsModel = new TeamsModels(),
    private matchesModels = new MatchesModels(),
  ) {}

  async listLeaderboardsHomeAwayService(definition: Definition) {
    const matches = await this.matchesModels.getAllMatchesFinished();
    const teams = await this.teamsModel.getAllTeams();
    const homeAwayLeaderboards = CountScore
      .leaderboards(matches as IMatches[], teams, definition as ['home', 'away']);
    return { data: CountScore.sortLeaderboards(homeAwayLeaderboards), status: 200 };
  }

  async listFullLeaderboardsService() {
    const home = await this.listLeaderboardsHomeAwayService(['home', 'away']);
    const away = await this.listLeaderboardsHomeAwayService(['away', 'home']);
    const fullLeaderboards = home.data.map((homeTeam: BoardTeamData) => {
      const teamAway = away.data.find((awayTeam: BoardTeamData) => awayTeam.name === homeTeam.name);
      if (teamAway === undefined) return homeTeam;

      return CountScore.auxiliaryLeaderboards(homeTeam, teamAway);
    });
    return { data: CountScore.sortLeaderboards(fullLeaderboards), status: 200 };
  }
}
export default LeaderBoardServices;
