import { Router } from 'express';
import LeaderBoardController from '../contoller/LeadersBorder.controller';

const routerLeaderboards = Router();

const leaderBoardController = new LeaderBoardController();

routerLeaderboards.get('/leaderboard/home', (req, res) => leaderBoardController
  .listLeaderboardsHomeAwayController(req, res, ['home', 'away']));

routerLeaderboards.get('/leaderboard/away', (req, res) => leaderBoardController
  .listLeaderboardsHomeAwayController(req, res, ['away', 'home']));

routerLeaderboards.get('/leaderboard', (req, res) => leaderBoardController
  .listFullLeaderboardsController(req, res));

export default routerLeaderboards;
