import Express from "express";
import { Chat, Message } from "../models/chat.js";
import { v4 as uuidv4} from  'uuid'

export const createChat = async (req, res, next) => {
    try {
        const chat = new Chat(req.body);
        chat.id = uuidv4()
        chat.save()
            .then(() => res.status(201).json({ "message": "Success", "chat": chat }))
            .catch((err) => res.status(404).json({ "message": "Failed to save", "error": err }));

    }
    catch (err) {
        res.status(404).json({ "message": "Failed", "error": err });
    }
}

export const getChat = async (req, res, next) => {
    try {
        const chats = await Chat.find();
        res.status(200).json({ "message": "chats fetched successfully", "chats": chats })
    } catch (error) {
        res.status(404).json({ "message": "failed to fetch chats" })
    }
}

export const getActiveChat = async (req, res, next) => {
    try {
        const id = req.params.id;
        const chat = await Chat.findOne({ id: id });
        if (chat)
            return res.status(200).json({ "message": "Current Chat fetched successfully", "chat": chat })
        else
            return res.status(200).json({ "message": "Chat not found", "id": id })
    } catch (error) {
        res.status(404).json({ "message": "failed to fetch chats" })
    }
}

export const updateChat = async (req, res, next) => {
    try {
        const id = req.params.id;
        const chat = await Chat.findOne({ id: id });

        if (!chat) {
            res.status(404).json({ "message": "Chat not found", "err": err })
        }
        else {
            const updateChat = await Chat.findOneAndUpdate({ id: id }, { "title":req.body.title?req.body.title:chat.title,"messages": [...chat.messages, new Message(req.body.messages[0]),new Message(req.body.messages[1])] }, { new: true });
            res.status(200).json({ "message": "Current updated successfully", "chat": updateChat })
        }

    } catch (err) {
        res.status(404).json({ "message": "failed to update chats", "err": err })
    }
}

export const deleteChat = async (req, res, next) => {
    try {
        const id = req.params.id;
        let chat = await Chat.findOne({id: id });
        if (!chat)
            return res.status(404).json({ "message": "Chat not found" })
        else{
            chat = await Chat.findOneAndDelete({id:id})
            return res.status(200).json({ "message": "Chat deleted successfully", "chat": chat })
        }
    } catch (error) {
        res.status(404).json({ "message": "failed to delete chats" })
    }
}

export const getApiKey = (req, res, next) => {
    try {
        const apiKey = process.env.OPENAI_API_KEY;
        if(apiKey)
            return res.status(200).json({ "apiKey": apiKey })
    } catch (error) {
        res.status(404).json({ "message": "failed to fetch apiKey" })
    }
}