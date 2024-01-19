import { createChat, deleteChat, getActiveChat, getApiKey, getChat, updateChat } from "../controllers/chat.js";
import { Chat } from "../models/chat.js";
import { Router } from 'express';

const chatRouter = Router();

chatRouter
    .post("/",createChat)
    .get("/",getChat)
    .get("/:id",getActiveChat)
    .delete("/:id",deleteChat)
    .patch("/:id",updateChat)
    

export default chatRouter;
