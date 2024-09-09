import express from 'express';
import Userctrl from '../Controllers/Userctrl.js';
import { isAuthenticatedUser,isAuthorized } from '../Middlewares/isAuth.js';


const UserRouter = express.Router();

//get all details of user
UserRouter.get('/api/v1/user/me',isAuthenticatedUser,Userctrl.getuserprofile)

//Update password
UserRouter.put('/api/v1/user/updatepass',isAuthenticatedUser,Userctrl.updatepassword)

//Update Profile
UserRouter.put('/api/v1/user/updateprofile',isAuthenticatedUser,Userctrl.updateprofiiel)

//getall users
UserRouter.get('/api/v1/user/getallusers',isAuthenticatedUser,isAuthorized("admin"),Userctrl.getalluser)

//getall users
UserRouter.get('/api/v1/user/getuser/:id',isAuthenticatedUser,isAuthorized("admin"),Userctrl.getuserdetails)

//update user details
UserRouter.put('/api/v1/user/getuser/:id',isAuthenticatedUser,isAuthorized("admin"),Userctrl.updateuserdetails)

//delete details
UserRouter.delete('/api/v1/user/getuser/:id',isAuthenticatedUser,isAuthorized("admin"),Userctrl.deleteuser)

export default UserRouter;