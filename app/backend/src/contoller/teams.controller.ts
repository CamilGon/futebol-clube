import { Request, Response } from 'express';
import TeamsService from '../service/teams.service';

class TeamsController {
  private teamsService: TeamsService;

  constructor() {
    this.teamsService = new TeamsService();
  }

  async getAllTeams(req: Request, res: Response) {
    try {
      const teams = await this.teamsService.getAllTeams();
      res.status(200).json(teams);
    } catch (error) {
      res.status(500).json({ message: 'Erro interno de servidor' });
    }
  }

  async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const team = await this.teamsService.getTeamById(id);
      if (!team) {
        res.status(404).json({ message: 'Team not found' });
      } else {
        res.status(200).json(team);
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro interno de servidor' });
    }
  }
}
export default TeamsController;
