import express from 'express';
import { SportsController } from '../controllers/sports.controller';
const sportsRouter = express.Router();

sportsRouter.route('/searchAllSports').get(
    (req, res)=>new SportsController().searchAllSports(req, res)
);

sportsRouter.route('/searchSport').post(
    (req, res)=>new SportsController().searchSport(req, res)
);

sportsRouter.route('/addSport').post(
    (req, res)=>new SportsController().addSport(req, res)
);

export default sportsRouter;