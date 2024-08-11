import ITeams from '../Interfaces/ITeams';
import IMatches from '../Interfaces/IMatches';
import BoardTeamData from '../types/BoardTeamData';

const teamFilter = (matches: IMatches[], teamId:number, homeOrAway: ['home', 'away']) => matches
  .filter((match) => match[`${homeOrAway[0]}TeamId`] === teamId);
const totalGames = (
  matches: IMatches[],
  teamId:number,
  homeOrAway: ['home', 'away'],
) => teamFilter(matches, teamId, homeOrAway).length;

const goalsFavor = (
  matches: IMatches[],
  teamId:number,
  homeOrAway: ['home', 'away'],
) => teamFilter(matches, teamId, homeOrAway)
  .reduce((acc, curr) => acc + curr[`${homeOrAway[0]}TeamGoals`], 0);

const goalsContra = (
  matches: IMatches[],
  teamId:number,
  homeOrAway: ['home', 'away'],
) => teamFilter(matches, teamId, homeOrAway)
  .reduce((acc, curr) => acc + curr[`${homeOrAway[1]}TeamGoals`], 0);

const totalVictory = (
  matches: IMatches[],
  teamId:number,
  homeOrAway: ['home', 'away'],
) => teamFilter(matches, teamId, homeOrAway)
  .reduce((acc, curr) => {
    if (curr[`${homeOrAway[0]}TeamGoals`] > curr[`${homeOrAway[1]}TeamGoals`]) return acc + 1;
    return acc;
  }, 0);

const totalDraws = (
  matches: IMatches[],
  teamId:number,
  homeOrAway: ['home', 'away'],
) => teamFilter(matches, teamId, homeOrAway)
  .reduce((acc, curr) => {
    if (curr[`${homeOrAway[0]}TeamGoals`] === curr[`${homeOrAway[1]}TeamGoals`]) return acc + 1;
    return acc;
  }, 0);

const totalLose = (
  matches: IMatches[],
  teamId:number,
  homeOrAway: ['home', 'away'],
) => teamFilter(matches, teamId, homeOrAway)
  .reduce((acc, curr) => {
    if (curr[`${homeOrAway[0]}TeamGoals`] < curr[`${homeOrAway[1]}TeamGoals`]) return acc + 1;
    return acc;
  }, 0);

const leaderboards = (matches: IMatches[], teams: ITeams[], homeOrAway: ['home', 'away']) => teams
  .map((team) => ({
    name: team.teamName,
    totalPoints: (totalVictory(matches, team.id, homeOrAway) * 3)
    + (totalDraws(matches, team.id, homeOrAway)),
    totalGames: totalGames(matches, team.id, homeOrAway),
    totalVictories: totalVictory(matches, team.id, homeOrAway),
    totalDraws: totalDraws(matches, team.id, homeOrAway),
    totalLosses: totalLose(matches, team.id, homeOrAway),
    goalsFavor: goalsFavor(matches, team.id, homeOrAway),
    goalsOwn: goalsContra(matches, team.id, homeOrAway),
    goalsBalance: goalsFavor(matches, team.id, homeOrAway)
     - goalsContra(matches, team.id, homeOrAway),
    efficiency: ((((totalVictory(matches, team.id, homeOrAway) * 3)
  + (totalDraws(matches, team.id, homeOrAway))) / (totalGames(matches, team.id, homeOrAway) * 3))
  * 100).toFixed(2),
  }));
const sortLeaderboards = (unsortedLeaderboards: BoardTeamData[]) => unsortedLeaderboards
  .sort((a, b) => {
    if (a.totalPoints !== b.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }
    if (a.totalVictories !== b.totalVictories) {
      return b.totalVictories - a.totalVictories;
    }
    if (a.goalsBalance !== b.goalsBalance) {
      return b.goalsBalance - a.goalsBalance;
    }
    if (a.goalsFavor !== b.goalsFavor) {
      return b.goalsFavor - a.goalsFavor;
    }
    return b.name.localeCompare(a.name);
  });
const auxiliaryLeaderboards = (homeTeam: BoardTeamData, teamAway: BoardTeamData) => ({
  name: homeTeam.name,
  totalPoints: homeTeam.totalPoints + teamAway.totalPoints,
  totalGames: homeTeam.totalGames + teamAway.totalGames,
  totalVictories: homeTeam.totalVictories + teamAway.totalVictories,
  totalDraws: homeTeam.totalDraws + teamAway.totalDraws,
  totalLosses: homeTeam.totalLosses + teamAway.totalLosses,
  goalsFavor: homeTeam.goalsFavor + teamAway.goalsFavor,
  goalsOwn: homeTeam.goalsOwn + teamAway.goalsOwn,
  goalsBalance: homeTeam.goalsBalance + teamAway.goalsBalance,
  efficiency: (((homeTeam.totalPoints + teamAway.totalPoints)
    / ((homeTeam.totalGames + teamAway.totalGames) * 3)) * 100).toFixed(2),
});
export default {
  leaderboards,
  sortLeaderboards,
  auxiliaryLeaderboards,
};
