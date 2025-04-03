import { Router } from "express";
const userRouter = Router();

import { isAuthorized } from '../middlewares/isAuthorized.js';
import { registerUser, loginUser, logoutUser, getUserDetails, updateUserProfile } from "../controllers/user.controller.js";

// CRUD operationalities on user.
userRouter.get('/user-details', isAuthorized, getUserDetails);

userRouter.put('/update-profile', isAuthorized, updateUserProfile);

// Authentication, registration, and logout of user.
userRouter.post('/register', registerUser);

userRouter.post('/login', loginUser);

userRouter.post('/logout', logoutUser);


export default userRouter;