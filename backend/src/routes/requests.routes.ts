import express from 'express';
import { RequestsController } from '../controllers/requests.controller';
const requestsRouter = express.Router();


requestsRouter.route('/register').post(
    (req, res)=>new RequestsController().register(req, res)
);

requestsRouter.route('/searchAllRequests').get(
    (req, res)=>new RequestsController().searchAllRequests(req, res)
);

requestsRouter.route('/removeRequest').post(
    (req, res)=>new RequestsController().removeRequest(req, res)
);

requestsRouter.route('/searchRequest').post(
    (req, res)=>new RequestsController().searchRequest(req, res)
);

export default requestsRouter;