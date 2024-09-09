import express from 'express';
import Authcontroller from '../Controllers/Authctrl.js';

const AuthRouter = express.Router();

//User Registration
AuthRouter.post('/api/v1/user/register',Authcontroller.registeruser);

//Login USer
AuthRouter.post('/api/v1/user/login',Authcontroller.loginuser);

//Logout USer
AuthRouter.get('/api/v1/user/logout',Authcontroller.logout);

export default AuthRouter;