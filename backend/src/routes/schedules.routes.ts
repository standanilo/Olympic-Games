import express from 'express';
import { SchedulesController } from '../controllers/schedules.controller';
const schedulesRouter = express.Router();

schedulesRouter.route('/searchSchedule').post(
    (req, res)=>new SchedulesController().searchSchedule(req, res)
);

schedulesRouter.route('/searchScheduleForResults').post(
    (req, res)=>new SchedulesController().searchScheduleForResults(req, res)
);

schedulesRouter.route('/addSchedule').post(
    (req, res)=>new SchedulesController().addSchedule(req, res)
);

schedulesRouter.route('/finishSchedule').post(
    (req, res)=>new SchedulesController().finishSchedule(req, res)
);

schedulesRouter.route('/updateSchedule').post(
    (req, res)=>new SchedulesController().updateSchedule(req, res)
);

export default schedulesRouter;