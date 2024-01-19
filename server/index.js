import Express from "express";
import cors from "cors";
import mongoose from "mongoose";
import chatRouter from "./routes/chat.js";
import axios from "axios";
import OpenAI from "openai";
import "dotenv/config";
import { getApiKey } from "./controllers/chat.js";

// Creating server

const app = Express();

// Database connection

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
}

main()
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.log(err));

//chatgpt

const apikey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apikey: apikey });

// Port

const HOST = "localhost";
const PORT = 5000;

// Middlewares

app.use(cors())
    .use(Express.json())
    .use("/chat", chatRouter)
    .get("/apikey", getApiKey)

app.get("/chatgpt", async (req, res) => {
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
        ],
    });

    console.log(completion.choices[0]);
});

// Listening Server

app.listen(PORT, HOST, () => {
    console.log(`Server is working at http://${HOST}:${PORT}`);
});
