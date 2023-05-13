import express from 'express';
import { CountriesController } from '../controllers/countries.controller';
const countriesRouter = express.Router();

countriesRouter.route('/searchAllCountries').get(
    (req, res)=>new CountriesController().searchAllCountries(req, res)
);

countriesRouter.route('/addGoldMedal').post(
    (req, res)=>new CountriesController().addGoldMedal(req, res)
);

countriesRouter.route('/addSilverMedal').post(
    (req, res)=>new CountriesController().addSilverMedal(req, res)
);

countriesRouter.route('/addBronzeMedal').post(
    (req, res)=>new CountriesController().addBronzeMedal(req, res)
);

countriesRouter.route('/addMember').post(
    (req, res)=>new CountriesController().addMember(req, res)
);

export default countriesRouter;