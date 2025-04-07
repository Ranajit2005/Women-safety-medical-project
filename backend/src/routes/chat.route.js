import express from "express";
import dotenv from "dotenv";

dotenv.config();


import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const router = express.Router();

router.post("/", async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    try {

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: message,
        });

        const botReply = response.text;
        res.json({ reply: botReply });
    } catch (error) {
        console.error("Error communicating with Gemini API:", error);
        res.status(500).json({ error: "Failed to fetch response" });
    }
});

export default router;