import express from 'express';
import { AthletesController } from '../controllers/athletes.controller';
const athletesRouter = express.Router();

athletesRouter.route('/searchAthletes').post(
    (req, res)=>new AthletesController().searchAthletes(req, res)
);

athletesRouter.route('/searchAthletesForComp').post(
    (req, res)=>new AthletesController().searchAthletesForComp(req, res)
);

athletesRouter.route('/updateIndex').post(
    (req, res)=>new AthletesController().updateIndex(req, res)
);

athletesRouter.route('/searchAthlete').post(
    (req, res)=>new AthletesController().searchAthlete(req, res)
);

athletesRouter.route('/addAthlete').post(
    (req, res)=>new AthletesController().addAthlete(req, res)
);

athletesRouter.route('/updateMedals').post(
    (req, res)=>new AthletesController().updateMedals(req, res)
);

athletesRouter.route('/updateDiscipline').post(
    (req, res)=>new AthletesController().updateDiscipline(req, res)
);

athletesRouter.route('/searchAthletesDiscipline').post(
    (req, res)=>new AthletesController().searchAthletesDiscipline(req, res)
);
export default athletesRouter;