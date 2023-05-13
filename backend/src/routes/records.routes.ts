import express from 'express';
import { RecordsController } from '../controllers/records.controller';
const recordsRouter = express.Router();

recordsRouter.route('/searchAllMales').get(
    (req, res)=>new RecordsController().searchAllMales(req, res)
);

recordsRouter.route('/searchAllFemales').get(
    (req, res)=>new RecordsController().searchAllFemales(req, res)
);

export default recordsRouter;