import { Request, Response } from 'express';
import MatchesServices from '../service/matches.service';

class MatchesController {
  constructor(
    private matchesServices = new MatchesServices(),
  ) {}

  async getMatchesController(req: Request, res: Response) {
    const isInProgress = req.query.inProgress;
    if (isInProgress === 'true') {
      const { data, status } = await this.matchesServices.getAllMatchesInProgress();
      return res.status(status).json(data);
    }
    if (isInProgress === 'false') {
      const { data, status } = await this.matchesServices.getAllMatchesFinishedService();
      return res.status(status).json(data);
    }
    const { data, status } = await this.matchesServices.getAllMatchesService();
    return res.status(status).json(data);
  }

  async finishMatchController(req: Request, res: Response) {
    const { id } = req.params;
    const { data, status } = await this.matchesServices.getfinishMatchService(id);
    return res.status(status).json(data);
  }

  async updateMatchController(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { data, status } = await this.matchesServices
      .updateMatchService(id, homeTeamGoals, awayTeamGoals);
    return res.status(status).json(data);
  }

  async addMatchController(req: Request, res: Response) {
    const { data, status } = await this.matchesServices
      .addMatchService(req.body);
    return res.status(status).json(data);
  }
}
export default MatchesController;
