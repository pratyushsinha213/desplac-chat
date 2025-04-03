import { Router } from "express";
const messageRouter = Router();

import { isAuthorized } from "../middlewares/isAuthorized.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";


messageRouter.get('/users', isAuthorized, getUsersForSidebar);

messageRouter.get('/:recieverId', isAuthorized, getMessages);

messageRouter.post('/send/:recieverId', isAuthorized, sendMessage);

export default messageRouter;