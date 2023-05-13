import express from 'express';
import { UserController } from '../controllers/user.controller';
const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res)=>new UserController().login(req, res)
);

userRouter.route('/register').post(
    (req, res)=>new UserController().register(req, res)
);

userRouter.route('/changePassword').post(
    (req, res)=>new UserController().changePassword(req, res)
);

userRouter.route('/searchAllCompDelegates').get(
    (req, res)=>new UserController().searchAllCompDelegates(req, res)
);

userRouter.route('/searchAllCompDelegatesAvail').get(
    (req, res)=>new UserController().searchAllCompDelegatesAvail(req, res)
);

userRouter.route('/searchCompDelegate').post(
    (req, res)=>new UserController().searchCompDelegate(req, res)
);

userRouter.route('/searchCountry').post(
    (req, res)=>new UserController().searchCountry(req, res)
);

export default userRouter;