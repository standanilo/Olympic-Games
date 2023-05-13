import express from 'express';
import { ResultsController } from '../controllers/results.controller';
const resultsRouter = express.Router();

resultsRouter.route('/addResult').post(
    (req, res)=>new ResultsController().addResult(req, res)
);

resultsRouter.route('/searchResults').post(
    (req, res)=>new ResultsController().searchResults(req, res)
);
export default resultsRouter;