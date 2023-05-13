import express from 'express';
import { DisciplinesController } from '../controllers/disciplines.controller';
const disciplinesRouter = express.Router();

disciplinesRouter.route('/searchAllDisciplines').get(
    (req, res)=>new DisciplinesController().searchAllDisciplines(req, res)
);

disciplinesRouter.route('/searchDiscipline').post(
    (req, res)=>new DisciplinesController().searchDiscipline(req, res)
);

disciplinesRouter.route('/searchDisciplineSport').post(
    (req, res)=>new DisciplinesController().searchDisciplineSport(req, res)
);

disciplinesRouter.route('/addDiscipline').post(
    (req, res)=>new DisciplinesController().addDiscipline(req, res)
);
export default disciplinesRouter;