import express from 'express';
import Authcontroller from '../Controllers/Authctrl.js';

const AuthRouter = express.Router();

//User Registration
AuthRouter.post('/api/v1/user/register',Authcontroller.registeruser);

//Login USer
AuthRouter.post('/api/v1/user/login',Authcontroller.loginuser);

//Logout USer
AuthRouter.get('/api/v1/user/logout',Authcontroller.logout);

//forgotpass
AuthRouter.post('/api/v1/user/password/forgot',Authcontroller.forgotpass);

//resetpass
AuthRouter.put('/api/v1/user/password/reset/:token',Authcontroller.resetpass);



export default AuthRouter;