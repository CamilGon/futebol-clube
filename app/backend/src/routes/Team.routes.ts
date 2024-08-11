import { Router } from 'express';
import TeamsController from '../contoller/teams.controller';

const TeamRoute = Router();

const teamsController = new TeamsController();

TeamRoute.get('/teams', (req, res) => teamsController.getAllTeams(req, res));
TeamRoute.get('/teams/:id', (req, res) => teamsController.getTeamById(req, res));

export default TeamRoute;
