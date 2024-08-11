import { Request, Response } from 'express';
import Definition from '../types/Definition';
import LeaderBoardServices from '../service/leadersBorders.service';

class LeaderBoardController {
  constructor(
    private leaderBoardServices = new LeaderBoardServices(),
  ) {}

  async listLeaderboardsHomeAwayController(
    _req: Request,
    res: Response,
    definition: Definition,
  ) {
    const { data, status } = await this.leaderBoardServices
      .listLeaderboardsHomeAwayService(definition);
    return res.status(status).json(data);
  }

  async listFullLeaderboardsController(_req: Request, res: Response) {
    const { data, status } = await this.leaderBoardServices
      .listFullLeaderboardsService();
    return res.status(status).json(data);
  }
}
export default LeaderBoardController;
