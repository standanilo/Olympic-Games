import express from 'express';
import { CompetitionsController } from '../controllers/competitions.controller';
const competitionsRouter = express.Router();

competitionsRouter.route('/searchCompetition').post(
    (req, res)=>new CompetitionsController().searchCompetition(req, res)
);

competitionsRouter.route('/searchAllCompetitions').get(
    (req, res)=>new CompetitionsController().searchAllCompetitions(req, res)
);

competitionsRouter.route('/searchAllCompetitionsDelegate').post(
    (req, res)=>new CompetitionsController().searchAllCompetitionsDelegate(req, res)
);

competitionsRouter.route('/addCompetition').post(
    (req, res)=>new CompetitionsController().addCompetition(req, res)
);

competitionsRouter.route('/endCompetition').post(
    (req, res)=>new CompetitionsController().endCompetition(req, res)
);
export default competitionsRouter;