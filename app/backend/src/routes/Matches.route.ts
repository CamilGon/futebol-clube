import { Router } from 'express';
import MatchesController from '../contoller/matches.controller';
import ValidateToken from '../middlewares/ValidateToken';

const MatchRoute = Router();

const matchesController = new MatchesController();

MatchRoute.get('/matches', (req, res) => matchesController.getMatchesController(req, res));

MatchRoute.patch('/matches/:id/finish', ValidateToken, (req, res) => matchesController
  .finishMatchController(req, res));

MatchRoute.patch('/matches/:id', ValidateToken, (req, res) => matchesController
  .updateMatchController(req, res));

MatchRoute.post('/matches', ValidateToken, (req, res) => matchesController
  .addMatchController(req, res));

export default MatchRoute;
